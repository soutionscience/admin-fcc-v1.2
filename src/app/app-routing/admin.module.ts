import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { LeagueDetailComponent } from '../league-detail/league-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaguesComponent } from '../leagues/leagues.component';

const routes: Routes=[
  {path: '', component: AdminHomeComponent}
]

@NgModule({
  declarations: [AdminHomeComponent, LeagueDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule
  ]
})
export class AdminModule { }
