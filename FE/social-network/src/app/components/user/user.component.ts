import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId: string = '';
  user: User = {} as User;
  usersFollowers: User[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoaderService: GlobalLoaderService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId') || '';
      this.fetchUser(this.userId);
    });
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

  private fetchUser(userId: string) {
    this.globalLoaderService.showLoader();
    console.log(this.userId);
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
        console.log(user);
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        this.globalLoaderService.hideLoader();
        console.log('Error: ', err);
      }
    });
  }
}
