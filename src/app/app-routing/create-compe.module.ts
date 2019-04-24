import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompeComponent } from '../create-compe/create-compe.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeagueDetailComponent } from '../league-detail/league-detail.component';
import { LeaguesComponent } from '../leagues/leagues.component';

const routes: Routes= [
  {path: '', component: CreateCompeComponent}]

@NgModule({
  declarations: [CreateCompeComponent, LeaguesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule
  ]
})
export class CreateCompeModule { }
