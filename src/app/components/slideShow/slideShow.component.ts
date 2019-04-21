import {Component, Input} from '@angular/core';
import {Slide} from './slide';

@Component({
  selector: 'slideshow',
  templateUrl: 'slideShow.component.html'
})
export class SlideShowComponent {
    @Input() slides: Slide[];
}
