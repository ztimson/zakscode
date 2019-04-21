import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    loggedIn = false;

    set title(title: string) {
        document.getElementsByTagName('title')[0].innerHTML = `Zaks Code${title ? ` - ${title}` : ''}`;
    }

    constructor(private route: ActivatedRoute, public authService: AuthService) {
        this.route.url.subscribe(() => this.title = ''); // Clear the title on nav event
        this.authService.user.subscribe(user => this.loggedIn = !!user);
    }
}
