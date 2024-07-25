import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    const { apiUrl } = environment;

    const response = this.http.get<User[]>(`${apiUrl}/users`);
    return response;
  }

  getUserById(userId: string) {
    const { apiUrl } = environment;

    const response = this.http.get<User>(`${apiUrl}/users/${userId}`);

    return response;
  }

  getUserFollowers(userId: string) {
    const { apiUrl } = environment;

    const response = this.http.get<User[]>(`${apiUrl}/users/${userId}/followers`);

    return response;
  }

  getUserFollowings(userId: string) {
    const { apiUrl } = environment;

    const response = this.http.get<User[]>(`${apiUrl}/users/${userId}/followings`);

    return response;
  }
}
