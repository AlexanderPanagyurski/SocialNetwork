import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/types/user';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
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
      console.log(this.user.userPosts);
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

  navigateTo(path: string, post: Post) {
    this.router.navigate([path, post.postId]);
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
        this.router.navigate(['not-found']);
      }
    });
  }
}
