import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';

import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FormsModule} from '@angular/forms';
import {TypewriterComponent} from './components/typewriter/typewriter.component';
import {SlideShowComponent} from './components/slideShow/slideShow.component';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SlideShowComponent,
        TypewriterComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AppRouting,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
    ],
    providers: [
        { provide: FirestoreSettingsToken, useValue: {} }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
