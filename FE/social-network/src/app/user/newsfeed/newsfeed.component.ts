import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post/post.service';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { Post } from 'src/app/types/post';
import { UserService } from '../user.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private router: Router,
    private globalLoaderService: GlobalLoaderService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  navigateTo(path: string, post: Post) {
    this.router.navigate([path, post.userId]);
  }

  private fetchPosts() {
    this.globalLoaderService.showLoader();

    this.postService.loadNewsfeed().subscribe({
      next: (posts) => {
        this.posts = posts;
        console.log(this.posts);
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        this.globalLoaderService.hideLoader();
        console.log('Error: ', err);
      }
    });
  }
}
