import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post/post.service';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { Post } from 'src/app/types/post';

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

  checkIfEdited(post: Post): string {
    const datePipe: DatePipe = new DatePipe('en-US');
    let date = post.createdOn;
    let isEdited = false;

    if (post.modifiedOn) {
      date = post.modifiedOn;
      isEdited = true;
    }
    return `${datePipe.transform(date, 'fullDate')} ${isEdited ? '(edited)' : ''}`;
  }

  vote(post: Post, isUpVote: boolean) {
    this.postService.vote(post.postId, isUpVote).subscribe({
      next: (response) => {
        post.votesCount = response.votesCount;
        post.isUpVote = response.isUpVote;
        post.isVoted = true;
      },
      error: (error) => {
        console.log("Error: ", error);
      }
    });
  }

  addToFavourite(post: Post) {
    this.postService.addToFavourite(post.postId).subscribe({
      next: (response) => {
        post.isFavourite = response.isFavourite;
        post.favoritesCount = response.favoritesCount;
      },
      error: (error) => {
        console.log("Error: ", error);
      }
    });
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
