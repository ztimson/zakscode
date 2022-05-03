import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable, of, timer} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

@Component({
    selector: 'typewriter',
    template: `<span class="typewriter">{{output | async}}</span>`,
    styleUrls: ['typewriter.component.scss']
})
export class TypewriterComponent {
	output?: Observable<string>;

    @Input() delay = 1500;
    @Input() speed = 100;
    @Input() set text(text: string) {
		if(!text) {
			this.output = of('');
		} else {
			this.output = timer(this.delay, this.speed).pipe(
				filter(n => n <= (text.length || 0)),
				tap(n => {
					if(n == text.length) this.done.emit();
				}),
				map(n => text.slice(0, n))
			);
		}
    }

    @Output() done = new EventEmitter<void>();
}
