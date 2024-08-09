import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Post } from '../types/post';
import { CookieService } from 'ngx-cookie-service';
import { AUTH_COOKIE_KEY } from '../constants';
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
    const { apiUrl } = environment;
    const response = this.http.get<Post>(`${apiUrl}/posts/${id}`);

    return response;
  }

  create(title: string, content: string) {
    const post: CreatePost = {
      postId: '',
      title: title,
      content: content
    }
    const response = this.http.post<CreatePost>('/api/posts', post);

    return response;
  }
}
