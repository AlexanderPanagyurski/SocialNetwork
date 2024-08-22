import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { Post } from 'src/app/types/post';
import { PostService } from '../post.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  postId: string = '';
  @Input() post: Post = {} as Post;

  
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoaderService: GlobalLoaderService) { }

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
  
  isLargePostContent(content: string): boolean {
    return content.length > 300;
  }

  shortContent(content: string): string {
    return content.substring(0, 300) + '...';
  }

  readMore(postId: string) {
    let x = document.getElementById(`short-content ${postId}`);
    let y = document.getElementById(`whole-content ${postId}`);
    let hyperlink = document.getElementById(`read-more ${postId}`);

    if (x && y && hyperlink && y.style.display === "none") {
      x.style.display = "none";
      y.style.display = "block";
      hyperlink.innerHTML = "Read Less";
    } else if (x && y && hyperlink && y.style.display !== "none") {
      x.style.display = "block";
      y.style.display = "none";
      hyperlink.innerHTML = "Read More";
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
