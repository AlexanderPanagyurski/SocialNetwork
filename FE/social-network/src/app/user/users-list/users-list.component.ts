import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  username: string = '';

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoaderService: GlobalLoaderService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || '';
      console.log(this.username);
      this.fetchUsers(this.username);
    });
  }

  loadUserFollowers(userId: string) {
    this.globalLoaderService.showLoader();

    this.usersFollowers = [];
    this.userService.getUserFollowers(userId).subscribe({
      next: (users) => {
        this.usersFollowers = users;
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

    this.usersFollowers = [];
    this.userService.getUserFollowings(userId).subscribe({
      next: (users) => {
        this.usersFollowers = users;
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        this.globalLoaderService.hideLoader();
        console.log('Error: ', err);
      }
    });
  }

  navigateTo(path: string, user: User) {
    this.router.navigate([path, user.userId]);
  }

  setProfileImage(user: User) {
    return this.userService.getUserProfileImageUrl(user);
  }

  private fetchUsers(username?:string) {
    this.globalLoaderService.showLoader();

    this.userService.getUsers(username!).subscribe({
      next: (users) => {
        this.users = users;
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        this.globalLoaderService.hideLoader();
        console.log('Error: ', err);
      }
    });
  }
}
