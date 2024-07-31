import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { ErrorComponent } from './shared/error/error.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: UsersListComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/:userId', component: UserDetailsComponent },
  { path: 'posts/:postId', component: PostDetailsComponent },
  { path: 'not-found', component: ErrorComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }