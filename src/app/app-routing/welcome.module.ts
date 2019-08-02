import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from '../PAGES/welcome/welcome.component';

const routes: Routes =[
  {path: '',component: WelcomeComponent, children:[
    {path: '', loadChildren: './admin.module#AdminModule'},
    {path: 'new-competition', loadChildren: './create-compe.module#CreateCompeModule'},
  ]}
   
]

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class WelcomeModule { }
