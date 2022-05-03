import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class QuoteService {
	readonly quotes = [
		'When you are a kid you don\'t realize you are also watching your parents grow up',
		'Some one at Google was like "Yea, just have someone drive down every road on earth!"',
		'Anxiety is like when video game combat music is playing but you can\'t find the enemy',
		'Why do kamikaze pilots wear helmets?',
		'The cake is a lie!',
		'How are unicorns fake but giraffes real?',
		'The number of people older than you never goes up',
		'When you brush your teeth you are cleaning your skeleton',
		'Pregenancy is like a group project where one person get\'s stuck with all the work',
		'If the universe wasn\'t infinite it would be even scarier',
		'Either we are alone in the universe or we are not. both are terrifying'
	];

	/**
	 * Return random quote
	 *
	 * @returns {string} - Quote
	 */
	random() {
		return this.quotes[Math.round(Math.random() * this.quotes.length)];
	}
}
