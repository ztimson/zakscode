import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

@Component({
    selector: 'typewriter',
    template: `
        <div class="d-inline typewriter"><h4 class="d-inline">{{output | async}}</h4></div>`,
    styleUrls: ['typewriter.component.scss']
})
export class TypewriterComponent {
    @Input() delay = 1500;
    @Input() speed = 100;
    @Input() set text(text: string) {
        this.output = timer(this.delay, this.speed).pipe(
            filter(n => n <= (text.length || 0)),
            tap(n => {
                if(n == text.length) this.done.emit();
            }),
            map(n => text.slice(0, n))
        );
    }

    @Output() done = new EventEmitter<void>();

    output: Observable<string>;
}
