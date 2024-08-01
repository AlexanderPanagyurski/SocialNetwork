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
      console.log(params);
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

  private fetchPost(postId: string) {
    this.globalLoaderService.showLoader();
    this.postService.getPostById(postId).subscribe({
      next: (post) => {
        this.post = post;
        console.log(post);
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        this.globalLoaderService.hideLoader();
        console.log('Error', err);
      }
    })
  }
}
