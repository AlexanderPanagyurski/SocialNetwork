import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { Post } from 'src/app/types/post';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit, OnDestroy {
  currentPage: number = 1;
  pageSize: number = 5;
  hasMorePosts: boolean = true;

  posts: Post[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private globalLoaderService: GlobalLoaderService,
    public userService: UserService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.fetchPosts();
    window.addEventListener('scroll', this.onWindowScroll, true);
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
      this.postService.getPosts(skip, take).subscribe({
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
}
