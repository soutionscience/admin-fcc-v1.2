import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatDialogModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Web3Service } from './util/web3.service';
import { CreateLeagueComponent } from './dialogs/create-league/create-league.component';
import { RestangularModule } from 'ngx-restangular';
import { restangularConfigFactory } from './shared/restangular.config';
import { TestDialogComponent } from './dialogs/test-dialog/test-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent, 
   TestDialogComponent
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
    ReactiveFormsModule,
    RestangularModule.forRoot(restangularConfigFactory),
    HttpClientModule,
    MatDialogModule
  ],
  entryComponents: [ TestDialogComponent],
  providers: [Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
