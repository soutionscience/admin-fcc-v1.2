import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from '../PAGES/user-detail/user-detail.component';
import { AppComponent } from '../app.component';

const routes: Routes=[
  {path: '', loadChildren: './welcome.module#WelcomeModule'},
  
  // {path: 'factory', loadChildren: './factory.module#FactoryModule'},
  // {path: 'users', loadChildren: './users.module#UsersModule'},
 // {path: 'users/:id', component: UserDetailComponent}
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule, AppComponent]
})
export class AppRoutingModule { }
