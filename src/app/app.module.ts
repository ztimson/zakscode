import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ContactFormComponent} from './components/contact-form/contact-form.component';
import {HomeComponent} from './views/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FormsModule} from '@angular/forms';
import {TypewriterComponent} from './components/typewriter/typewriter.component';
import {SlideShowComponent} from './components/slideShow/slideShow.component';
import {AppComponent} from './views/app/app.component';
import {AppRouting} from './app.routing';
import {ConsoleComponent} from './components/console/console.component';

@NgModule({
    declarations: [
        AppComponent,
        ConsoleComponent,
		ContactFormComponent,
        HomeComponent,
        SlideShowComponent,
        TypewriterComponent
    ],
    imports: [
        AppRouting,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
