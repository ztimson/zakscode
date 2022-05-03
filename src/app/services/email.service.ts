import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {formEncode} from '../misc/utils';

@Injectable({providedIn: 'root'})
export class EmailService {
	constructor(private http: HttpClient) { }

	/**
	 * Send an email to website admin.
	 *
	 * @param {string} subject - Email subject line
	 * @param {string} message - Email body
	 * @returns {Promise<Object | undefined>} - Response from Postmail API
	 */
	send(subject: string, message: string) {
		return this.http.post('https://postmail.invotes.com/send', formEncode({
			access_token: 's7uhce84sx6fayy5xlq0nrtx',
			subject: subject,
			text: message
		}), {
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).toPromise();
	}
}
