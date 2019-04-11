import {Component, Input} from '@angular/core';
import {timer} from 'rxjs';

@Component({
  selector: 'typewriter',
  template: `<div class="d-inline typewriter"><h1>{{output}}</h1></div>`,
  styleUrls: ['typewriter.component.scss']
})
export class TypewriterComponent {
  @Input() text: string;

  done = true;
  output: string;

  constructor() {
    timer(1500, 100).subscribe(() => {
      console.log('fire');
      if(this.done && this.text) {
        this.output = '';
        this.done = false;
      }

      this.output += this.text.slice(0, 1);
      this.text = this.text.slice(1);
      if(!this.text) this.done = true;
    });
  }
}
