import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(private route: ActivatedRoute, private title: Title) {
        this.route.url.subscribe(() => this.setTitle(''));
    }

	setTitle(title: string) {
		this.title.setTitle(`Zak's Code${title ? ` - ${title}` : ''}`);
	}
}
