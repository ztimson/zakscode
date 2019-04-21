import { Component } from '@angular/core';
import {AppStore} from './app.store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  quote: Observable<string>;

  constructor(private store: AppStore) {
    this.quote = store.quotes.pipe(map(quotes => {
        let quote = quotes[Math.floor(Math.random() * quotes.length)];
        return quote.text;
    }))
  }
}
