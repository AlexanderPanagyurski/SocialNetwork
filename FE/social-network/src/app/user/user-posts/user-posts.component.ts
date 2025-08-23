import { Component } from '@angular/core';
import { Post } from 'src/app/types/post';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent {
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
    if (!this.hasMorePosts) {
      return;
    }

    const skip = (this.currentPage - 1) * this.pageSize;
    const take = this.pageSize;
    this.globalLoaderService.showLoader();

    this.userService.getUserPosts(userId, skip, take).subscribe({
      next: (newPosts) => {
        this.posts = [...this.posts, ...newPosts];
        if (newPosts.length < this.pageSize) {
          this.hasMorePosts = false;
        }
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        this.globalLoaderService.hideLoader();
        console.log('Error', err);
        this.router.navigate(['not-found']);
      }
    })
  }
}
