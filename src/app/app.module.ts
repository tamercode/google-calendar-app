import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import {EventsComponent} from './events/events.component';



@NgModule({
  declarations: [
    AppComponent, EventsComponent,
  ],
  imports: [
    BrowserModule,
    ClarityModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    JsonpModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'it' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
