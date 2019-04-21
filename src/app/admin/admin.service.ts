import {Observable} from 'rxjs';
import {DbUser} from '../models/dbUser';
import {AngularFirestore} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    users: Observable<DbUser[]>;

    constructor(private firestore: AngularFirestore) {
        this.users = this.firestore.collection<DbUser>('users').valueChanges();
    }
}
