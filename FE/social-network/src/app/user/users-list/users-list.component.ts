import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = true;
  usersFollowers: User[] = [];

  constructor(
    public userService: UserService,
    private router: Router,
    private globalLoaderService: GlobalLoaderService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  loadUserFollowers(userId: string) {
    this.globalLoaderService.showLoader();

    console.log(userId);
    this.usersFollowers = [];
    this.userService.getUserFollowers(userId).subscribe({
      next: (users) => {
        this.usersFollowers = users;
        console.log(this.usersFollowers);
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        this.globalLoaderService.hideLoader();
        console.log('Error: ', err);
      }
    });
  }

  loadUserFollowings(userId: string) {
    this.globalLoaderService.showLoader();

    console.log(userId);
    this.usersFollowers = [];
    this.userService.getUserFollowings(userId).subscribe({
      next: (users) => {
        this.usersFollowers = users;
        console.log(this.usersFollowers);
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        this.globalLoaderService.hideLoader();
        console.log('Error: ', err);
      }
    });
  }

  onSelect(user: User) {
    this.router.navigate(['users', user.userId]);
  }

  private fetchUsers() {
    this.globalLoaderService.showLoader();

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log(users);
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        this.globalLoaderService.hideLoader();
        console.log('Error: ', err);
      }
    });
  }
}
