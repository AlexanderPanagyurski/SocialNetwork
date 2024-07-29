import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ErrorComponent } from './error/error/error.component';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/:userId', component: UserComponent },
  {path: 'not-found' , component: ErrorComponent},
  {path: '**' , redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UserComponent]
