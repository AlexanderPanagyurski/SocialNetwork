import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import FavouritePostsComponent from './favourite-posts/favourite-posts.component';
import { UserPostsComponent } from './user-posts/user-posts.component';

const routes: Routes = [
  { path: 'newsfeed', component: NewsfeedComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/:userId', component: UserDetailsComponent },
  { path: 'users/:userId/edit', component: UserEditComponent },
  { path: 'users/:userId/favourite-posts', component: FavouritePostsComponent },
  { path: 'users/:userId/posts', component: UserPostsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
