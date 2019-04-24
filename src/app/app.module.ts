import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Web3Service } from './util/web3.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
