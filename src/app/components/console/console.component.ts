import {Component, Input, ViewChild} from '@angular/core';
import {sleep} from '../../misc/utils';
import {TypewriterComponent} from '../typewriter/typewriter.component';

@Component({
	selector: 'console',
	templateUrl: './console.component.html',
	styleUrls: ['./console.component.scss']
})
export class ConsoleComponent {
	done = () => {};
	input = '';
	output: string[] = [];
	prompt = '>'

	@Input() height: string = 'auto';

	@ViewChild(TypewriterComponent) typewriter!: TypewriterComponent;

	clear() { this.output = []; }

	exec(input: string, output: () => any, pause = 1000) {
		return new Promise<void>(res => {
			this.done = async () => {
				await sleep(pause);
				this.input = '';
				this.output.push(`${this.prompt} ${input}`);
				const out = output();
				if(typeof out == 'string') this.output.push(out);
				res();
			};
			this.input = input;
		});
	}
}
