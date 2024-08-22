import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/types/post';
import { PostService } from '../post.service';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postId: string = '';
  post: Post = {} as Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoaderService: GlobalLoaderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('postId') || '';
      this.fetchPost(this.postId);
    });
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

  setProfileImage(post: Post) {
    return this.postService.setUserProfileImageUrl(post);
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

  addToFavourite(post?: Post) {
    if (post) {
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
  }

  private fetchPost(postId: string) {
    this.globalLoaderService.showLoader();
    this.postService.getPostById(postId).subscribe({
      next: (post) => {
        this.post = post;
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
