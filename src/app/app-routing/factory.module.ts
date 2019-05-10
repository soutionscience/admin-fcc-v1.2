import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FactoryComponent } from '../factory/factory.component';
import { CreateLeagueComponent } from '../dialogs/create-league/create-league.component';
import { TestDialogComponent } from '../dialogs/test-dialog/test-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { LeagueDetailComponent } from '../DETAILS/league-detail/league-detail.component';

const routes: Routes=[
{path: '', component: FactoryComponent}
]

@NgModule({
  declarations: [FactoryComponent, CreateLeagueComponent, LeagueDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule, MatDialogModule
  ]
})
export class FactoryModule { }
