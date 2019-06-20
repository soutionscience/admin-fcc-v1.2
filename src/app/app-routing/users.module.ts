import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../PAGES/users/users.component';
import { Routes, RouterModule} from '@angular/router';
import { UserDetailComponent } from '../PAGES/user-detail/user-detail.component';

const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: ':id', component: UserDetailComponent}
]

@NgModule({
  declarations: [UsersComponent, UserDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
