import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
    private globalLoaderService: GlobalLoaderService) { }

  
  ngOnInit(): void {
    this.mapUserId();
    this.fetchUser();
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

  private fetchUser() {
    this.globalLoaderService.showLoader();
    console.log(this.userId);
    this.userService.getUserById(this.userId).subscribe({
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

  private mapUserId(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params.get('userId')){
        this.userId = params.get('userId') || '';
      }
    });
  }
}
