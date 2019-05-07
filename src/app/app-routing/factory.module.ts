import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FactoryComponent } from '../factory/factory.component';

const routes: Routes=[
{path: '', component: FactoryComponent}
]

@NgModule({
  declarations: [FactoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FactoryModule { }
