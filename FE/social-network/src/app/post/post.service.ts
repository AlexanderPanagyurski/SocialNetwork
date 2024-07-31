import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Post } from '../types/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPostById(id: string) {
    const { apiUrl } = environment;
    debugger;
    const response = this.http.get<Post>(`${apiUrl}/posts/${id}`);

    return response;
  }
}
