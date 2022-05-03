import {Component, ViewChild} from '@angular/core';
import {ConsoleComponent, ConsoleConfig} from '../../components/console/console.component';
import {QuoteService} from '../../services/quote.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
	@ViewChild(ConsoleComponent) console!: ConsoleComponent;

	constructor(private quotes: QuoteService) {
		setTimeout(() => this.console.exec('bash ./random-thought.sh', () => quotes.random()), 3000);
	}
}
