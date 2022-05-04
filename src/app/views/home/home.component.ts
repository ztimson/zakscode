import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ConsoleComponent} from '../../components/console/console.component';
import {ProjectsService} from '../../services/projects.service';
import {QuoteService} from '../../services/quote.service';
import {sleep} from '../../misc/utils';

@Component({
	selector: 'home',
	templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit {
	@ViewChild(ConsoleComponent) console!: ConsoleComponent;

	constructor(public projectsService: ProjectsService, private quotes: QuoteService) { }

	ngAfterViewInit() { this.animateConsole(); }

	animateConsole() {
		setTimeout(async () => {
			await this.console.exec('bash ./random-thought.sh', () => this.quotes.random());
			await sleep(10000);
			await this.console.exec('clear', async () => this.console.clear());
			this.animateConsole();
		}, 1000);
	}
}
