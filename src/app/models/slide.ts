import {SafeUrl} from '@angular/platform-browser';

export interface Slide {
    title: string
    description: string
    image: string | SafeUrl
}
