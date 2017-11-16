import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';

import {FormsModule} from '@angular/forms';
import {ListasComponent} from './components/listas/listas.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule],
  declarations: [AppComponent, ListasComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }