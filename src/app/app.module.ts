import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FormsModule} from '@angular/forms';
import {TypewriterComponent} from './components/typewriter/typewriter.component';
import {SlideShowComponent} from './components/slideShow/slideShow.component';

@NgModule({
    declarations: [
        AppComponent,
        SlideShowComponent,
        TypewriterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
