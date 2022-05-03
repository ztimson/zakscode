import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class QuoteService {
	readonly quotes = [
		'When you are a kid you don\'t realize you are also watching your parents grow up',
		'Some one at Google was like "Yea, just have someone drive down every road on earth!"',
		'Anxiety is like when video game combat music is playing but you can\'t find the enemy',
		'Why do kamikaze pilots wear helmets?',
		'The cake is a lie!'
	];

	random() {
		return this.quotes[Math.round(Math.random() * this.quotes.length)];
	}
}
