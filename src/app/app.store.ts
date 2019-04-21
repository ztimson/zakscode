import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Quote} from './models/quote';
import {DbUser} from './models/dbUser';

@Injectable({
    providedIn: 'root'
})
export class AppStore {
    quotes: Observable<Quote[]>;

    constructor(private firestore: AngularFirestore) {
        this.quotes = this.firestore.collection<Quote>('quotes').valueChanges();
    }

    addQuote(text: string) {
        return this.firestore.collection<Quote>('quotes').add({text: text});
    }

    async getUser(uid: string) {
        let user = await this.firestore.collection<DbUser>('users').doc(uid).get().toPromise();
        return user.data();
    }
}
