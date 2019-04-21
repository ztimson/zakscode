import {Component, Input} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: 'typewriter',
    template: `
        <div class="d-inline typewriter"><h1>{{output | async}}</h1></div>`,
    styleUrls: ['typewriter.component.scss']
})
export class TypewriterComponent {
    readonly delay = 1500;
    readonly speed = 100;

    @Input()
    set text(text: string) {
        this.output = timer(this.delay, this.speed).pipe(filter(n => n <= text.length), map(n => text.slice(0, n)));
    }

    output: Observable<string>;
}
