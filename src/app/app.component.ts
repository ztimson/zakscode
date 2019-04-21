import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    set title(title: string) {
        document.getElementsByTagName('title')[0].innerHTML = `Zaks Code${title ? ` - ${title}` : ''}`;
    }
}
