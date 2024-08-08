import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Post } from '../types/post';
import { CookieService } from 'ngx-cookie-service';
import { AUTH_COOKIE_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient) { }

  loadNewsfeed() {
    const authCookie: string = this.cookieService.get(AUTH_COOKIE_KEY);
    console.log(authCookie);
    const headers = { 'Authorization': `Bearer ${authCookie}` }

    const response = this.http.get<Post[]>('/api/posts', { headers });

    return response;
  }

  getPostById(id: string) {
    const { apiUrl } = environment;
    const response = this.http.get<Post>(`${apiUrl}/posts/${id}`);

    return response;
  }
}
