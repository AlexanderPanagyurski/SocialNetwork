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
  posts: Post[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoaderService: GlobalLoaderService) { }


  ngOnInit(): void {
    debugger;
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId') || '';
      this.fetchPosts(this.userId);
    });
  }

  private fetchPosts(userId: string) {
    this.globalLoaderService.showLoader();
    this.userService.getUserPosts(userId).subscribe({
      next: (posts) => {
        this.posts = posts;
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
