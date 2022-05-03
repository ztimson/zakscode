import {ChangeDetectorRef, Component} from '@angular/core';
import {EmailService} from '../../services/email.service';

@Component({
	selector: 'contact-form',
	templateUrl: './contact-form.component.html'
})
export class ContactFormComponent {
	email = '';
	error = false;
	loading = false;
	message = '';
	subject = '';
	success = false;

	constructor(private changeRef: ChangeDetectorRef, private emailService: EmailService) { }

	async send() {
		this.error = false;
		this.success = false;
		if(this.loading || !this.email || !this.subject || !this.message) return;
		this.loading = true;
		this.emailService.send(`ZaksCode: ${this.subject}`, `From: ${this.email}\n\n${this.message}`
		).then(() => {
			this.email = '';
			this.message = '';
			this.success = true;
			this.subject = '';
		}).catch(err => {
			// Postmail seems to always return an error message
			if(200 <= err.status && err.status < 300) {
				this.email = '';
				this.message = '';
				this.success = true;
				this.subject = '';
			} else {
				this.error = true;
			}
		}).finally(() => {
			this.loading = false;
			this.changeRef.detectChanges();
		});
	}
}
