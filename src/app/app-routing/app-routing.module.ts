import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from '../PAGES/user-detail/user-detail.component';

const routes: Routes=[
  {path: '', loadChildren: './admin.module#AdminModule'},
  {path: 'new-competition', loadChildren: './create-compe.module#CreateCompeModule'},
  {path: 'factory', loadChildren: './factory.module#FactoryModule'},
  {path: 'users', loadChildren: './users.module#UsersModule'},
 // {path: 'users/:id', component: UserDetailComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule]
})
export class AppRoutingModule { }
