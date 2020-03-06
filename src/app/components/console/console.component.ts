import {Component} from '@angular/core';
import {AppStore} from '../../app.store';
import {map} from 'rxjs/operators';

@Component({
    selector: 'console',
    templateUrl: './console.component.html'
})
export class ConsoleComponent {
    private done = false;

    input = './motd.sh';
    output = [];
    quote;

    constructor(private store: AppStore) {
        store.quotes.subscribe(quotes => {
            const quote = quotes[Math.floor(Math.random() * quotes.length)];
            this.quote = quote.text;
        });
    }

    enter() {
        if(this.done) return;
        setTimeout(() =>  {
            this.output.push(this.input);
            this.input = '';
            setTimeout(() => this.output.push(this.quote), 500);
        }, 1500);
        this.done = true;
    }
}
