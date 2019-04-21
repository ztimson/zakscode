import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {CanActivate, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import { auth } from 'firebase';

import {map} from 'rxjs/operators';
import {User} from './models/user';
import {AppStore} from './app.store';
import {tap} from 'rxjs/internal/operators/tap';
import {filter} from 'rxjs/internal/operators/filter';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {
    user = new BehaviorSubject<User>(null);

    constructor(private store: AppStore, private afAuth: AngularFireAuth, private router: Router) {
        this.afAuth.user.subscribe(async user => {
            this.user.next(user ? <User>Object.assign(await this.store.getUser(user.uid), user): null);
        });
    }

    canActivate(): Observable<boolean> {
        return this.user.pipe(
            filter(user => !!user),
            map(user => !user.isAnonymous),
            tap(user => user ? null : this.googleLogin())
        );
    }

    googleLogin() {
        return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    async logout() {
        await this.afAuth.auth.signOut();
        this.router.navigate(['/']);
    }
}
