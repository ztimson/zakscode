import {Component, Input} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'typewriter',
  template: `<div class="d-inline typewriter"><h1>{{output | async}}</h1></div>`,
  styleUrls: ['typewriter.component.scss']
})
export class TypewriterComponent {
  @Input() text: string;

  output: Observable<string>;

  constructor() {
    this.output = timer(1500, 100).pipe(filter(n => n <= this.text.length), map(n => this.text.slice(0, n)))
  }
}
