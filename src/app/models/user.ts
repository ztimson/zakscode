import {User as FirebaseUser} from 'firebase';
import {DbUser} from './dbUser';

export interface User extends FirebaseUser, DbUser { }
