import {Component, Input, ViewChild} from '@angular/core';
import { take } from 'rxjs';
import {TypewriterComponent} from '../typewriter/typewriter.component';

export type ConsoleConfig = {
	input: string,
	output: () => string
}

@Component({
    selector: 'console',
    templateUrl: './console.component.html',
	styleUrls: ['./console.component.scss']
})
export class ConsoleComponent {
    input = '';
	output: string[] = [];
	prompt = '>'

	done = () => {};

	@Input() height: string = 'auto';

	@ViewChild(TypewriterComponent) typewriter!: TypewriterComponent;

	exec(input: string, output: () => string) {
		this.done = () => {
			this.output.push(`${this.prompt} ${input}`);
			console.log(output());
			this.output.push(output());
			this.input = '';
		};
		this.input = input;
	}
}
