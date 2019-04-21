import { Component } from '@angular/core';
import {AppStore} from '../app.store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  quote: Observable<string>;

  constructor(private store: AppStore) {
    this.quote = store.quotes.pipe(map(quotes => {
        let quote = quotes[Math.floor(Math.random() * quotes.length)];
        return quote.text;
    }))
  }
}
