import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  quote: string;
  quotes = [
    'Why do Kamikaze pilots wear helmets?',
    'Remember that you\'re unique... Just like everyone else'
  ];

  constructor() {
    this.quote = this.quotes[Math.floor(Math.random() * this.quotes.length)]
  }
}
