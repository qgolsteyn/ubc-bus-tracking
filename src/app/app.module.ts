import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { BusCardComponent } from './bus-card/bus-card.component';

/**
 * The main module for this application
 */
@NgModule({
  declarations: [
    AppComponent,
    BusCardComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
