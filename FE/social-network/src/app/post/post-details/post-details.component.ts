import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/types/post';
import { PostService } from '../post.service';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { ActivatedRoute, Router } from '@angular/router';

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
