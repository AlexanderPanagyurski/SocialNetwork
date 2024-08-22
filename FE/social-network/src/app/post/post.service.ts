import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Post } from '../types/post';
import { CookieService } from 'ngx-cookie-service';
import { CreatePost } from '../types/createPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient) { }

  loadNewsfeed() {
    const response = this.http.get<Post[]>('/api/posts');

    return response;
  }

  getPostById(id: string) {
    const response = this.http.get<Post>(`/api/posts/${id}`);

    return response;
  }

  create(formData: FormData) {
    // const post: CreatePost = {
    //   postId: '',
    //   title: title,
    //   content: content,
    //   images: images
    // }
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
    return '../../../assets/images/default-profile-image.png';
  }

  addToFavourite(postId: string) {
    const response = this.http.post<Post>(`/api/posts/${postId}/favourite`, { postId });

    return response;
  }
}
