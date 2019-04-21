import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Quote} from './models/quote';

@Injectable({
    providedIn: 'root'
})
export class AppStore {
    quotes: Observable<Quote[]>;

    constructor(private firestore: AngularFirestore) {
        this.quotes = this.firestore.collection<Quote>('quotes').valueChanges();
    }
}
