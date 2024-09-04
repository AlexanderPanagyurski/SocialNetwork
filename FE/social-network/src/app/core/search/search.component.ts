import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DEFAULT_USER_IMAGE_URL } from 'src/app/constants';
import { User } from 'src/app/types/user';
import { UserService } from 'src/app/user/user.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchedUsers: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router) { }

  get searchedUsersCount(): number {
    return this.searchedUsers.length;
  }

  searchUser(event: any) {
    let username = event.target.value;
    this.userService.getUsersByUsername(username).subscribe({
      next: (response) => {
        console.log(response);
        this.searchedUsers = response;
      },
      error: (error) => {
        console.log('Error: ', error);
      }
    })
  }

  searchUsersWithUsername(form: NgForm) {
    const { username } = form.value;
    this.searchedUsers = [];

    if (username) {
      this.router.navigate(['users'], { queryParams: { username: username } });
    } else {
      this.router.navigate(['users']);
    }
  }

  setUserProfileImageUrl(user: User) {
    if (user.profileImageUrl) {
      return `data:image/JPEG;base64,${user.profileImageUrl}`;
    }
    return DEFAULT_USER_IMAGE_URL;
  }

  navigateTo(path: string, user?: User) {
    this.searchedUsers = [];

    if (user) {
      this.router.navigate([path, user?.userId]);
    } else {
      this.router.navigate([path]);
    }
  }
}

