import {Component, Input} from '@angular/core';

export type Slide = {
	title: string;
	description: string;
	image: string;
}

@Component({
  selector: 'slideshow',
  templateUrl: 'slideShow.component.html'
})
export class SlideShowComponent {
    @Input() slides: Slide[] = [];
}
