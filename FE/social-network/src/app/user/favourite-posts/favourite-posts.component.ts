import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/types/post';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';

@Component({
  selector: 'app-favourite-posts',
  templateUrl: './favourite-posts.component.html',
  styleUrls: ['./favourite-posts.component.css']
})
export default class FavouritePostsComponent implements OnInit, OnDestroy {
  userId: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  hasMorePosts: boolean = true;

  posts: Post[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoaderService: GlobalLoaderService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId') || '';
      this.fetchPosts(this.userId);
      window.addEventListener('scroll', this.onWindowScroll, true);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll, true);
  }

  onLoadMore() {
    if (!this.hasMorePosts) {
      return;
    }

    this.currentPage++;

    this.fetchPosts(this.userId);
  }

  onWindowScroll = () => {
    const threshold = 150;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;
    if (height - position < threshold) {
      this.onLoadMore();
    }
  };

  private fetchPosts(userId: string) {
    const skip = (this.currentPage - 1) * this.pageSize;
    const take = this.pageSize;
    this.globalLoaderService.showLoader();

    setTimeout(() => {
      this.userService.getFavouritePosts(userId, skip, take).subscribe({
        next: (newPosts) => {
          this.posts = [...this.posts, ...newPosts];
          if (newPosts.length < this.pageSize) {
            this.hasMorePosts = false; // No more posts to load
          }
          this.globalLoaderService.hideLoader();
        },
        error: (err) => {
          this.globalLoaderService.hideLoader();
          console.log('Error', err);
          this.router.navigate(['not-found']);
        }
      })
    }, 1000);
  }
}
