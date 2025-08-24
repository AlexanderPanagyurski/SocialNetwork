import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/types/user';
import { Post } from 'src/app/types/post';
import { PostService } from 'src/app/post/post.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userId: string = '';
  user: User = {} as User;
  usersFollowers: User[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  hasMorePosts: boolean = true;
  posts: Post[] = [];

  constructor(
    public postService: PostService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoaderService: GlobalLoaderService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const newUserId = params.get('userId') || '';
      
      if (this.userId !== newUserId) {
        this.userId = newUserId;
  
        // Reset state
        this.posts = [];
        this.currentPage = 1;
        this.hasMorePosts = true;
  
        this.fetchUser(this.userId);
        this.fetchPosts();
      }
  
      window.removeEventListener('scroll', this.onWindowScroll, true); // prevent multiple bindings
      window.addEventListener('scroll', this.onWindowScroll, true);
    });
  }

  get userLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll, true);
  }

  onLoadMore() {
    if (!this.hasMorePosts) {
      return;
    }

    this.currentPage++;

    this.fetchPosts();
  }

  onWindowScroll = () => {
    const threshold = 150;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;
    if (height - position < threshold) {
      this.onLoadMore();
    }
  };

  fetchPosts() {
    if (!this.hasMorePosts) {
      return; // No more posts to load
    }

    const skip = (this.currentPage - 1) * this.pageSize;
    const take = this.pageSize;
    this.globalLoaderService.showLoader();

    setTimeout(() => {
      this.postService.getUserPosts(this.userId, skip, take).subscribe({
        next: (newPosts) => {
          this.posts = [...this.posts, ...newPosts];
          if (newPosts.length < this.pageSize) {
            this.hasMorePosts = false;
          }
          this.globalLoaderService.hideLoader();
        },
        error: (err) => {
          this.globalLoaderService.hideLoader();
          console.log('Error: ', err);
        }
      });
    }, 1000);
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

  follow(followedUserId: string) {
    this.userService.manageSubscription(followedUserId).subscribe({
      next: () => {
        this.user.isFollowed = true;
      },
      error: (error) => {
        console.log("Error: ", error);
      }
    });
  }

  unfollow(followedUserId: string) {
    this.userService.manageSubscription(followedUserId).subscribe({
      next: () => {
        this.user.isFollowed = false;
      },
    });
  }

  navigateTo(path: string, post: Post) {
    this.router.navigate([path, post.postId]);
  }

  private fetchUser(userId: string) {
    this.globalLoaderService.showLoader();
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        this.globalLoaderService.hideLoader();
        console.log('Error: ', err);
      }
    });
  }
}
