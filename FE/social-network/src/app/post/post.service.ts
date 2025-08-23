import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../types/post';
import { CookieService } from 'ngx-cookie-service';
import { CreatePost } from '../types/createPost';
import { PostComment } from '../types/post-comment';
import { DEFAULT_USER_IMAGE_URL } from '../constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient) { }

  getPosts(skip: number = 0, take: number = 5): Observable<Post[]> {
    const response = this.http.get<Post[]>(`/api/posts/explore?skip=${skip}&take=${take}`);

    return response;
  }

  loadNewsfeed(skip: number = 0, take: number = 5) {
    const response = this.http.get<Post[]>(`/api/posts?skip=${skip}&take=${take}`);

    return response;
  }

  getPostById(id: string) {
    const response = this.http.get<Post>(`/api/posts/${id}`);

    return response;
  }

  getPostComments(postId: string) {
    const response = this.http.get<PostComment[]>(`/api/posts/${postId}/comments`);

    return response;
  }

  addPostComment(postId: string, parentId: string, content: string) {
    const response = this.http.post<PostComment>(`/api/posts/${postId}/comment`, { postId, parentId, content });

    return response;
  }

  deletePost(postId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete<void>(`/api/posts/${postId}`, { headers });
  }

  create(formData: FormData) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    headers.set('Accept', '*/*');
    const response = this.http.post<CreatePost>('/api/posts', formData, { headers });

    return response;
  }

  vote(postId: string, isUpVote: boolean) {

    const response = this.http.post<Post>(`/api/posts/${postId}/vote`, { postId, isUpVote });

    return response;
  }

  setUserProfileImageUrl(post: Post): string {
    if (post.userProfileImageUrl) {
      return `data:image/JPEG;base64,${post.userProfileImageUrl}`;
    }
    return DEFAULT_USER_IMAGE_URL;
  }

  addToFavourite(postId: string) {
    const response = this.http.post<Post>(`/api/posts/${postId}/favourite`, { postId });

    return response;
  }
}
