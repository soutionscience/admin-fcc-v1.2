import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes=[
  {path: '', loadChildren: './admin.module#AdminModule'},
  {path: 'new-competition', loadChildren: './create-compe.module#CreateCompeModule'}
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
