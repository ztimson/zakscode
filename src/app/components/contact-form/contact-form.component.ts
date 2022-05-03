import {Component} from '@angular/core';
import {formEncode} from '../../misc/utils';

@Component({
	selector: 'contact-form',
	templateUrl: './contact-form.component.html'
})
export class ContactFormComponent {
	email = '';
	loading = false;
	message = '';
	subject = '';

	async send() {
		if(this.loading || !this.email || !this.subject || !this.message) return;
		this.loading = true;
		await fetch('https://postmail.invotes.com/send', {
			method: 'POST',
			mode: 'no-cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: formEncode({
				access_token: 's7uhce84sx6fayy5xlq0nrtx',
				subject: `ZaksCode: ${this.subject}`,
				text: `From: ${this.email}\n\n${this.message}`
			})
		});
		this.loading = false;
	}
}
