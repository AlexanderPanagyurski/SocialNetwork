import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../types/user';
import { UserForAuth } from '../types/userForAuth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserForAuth | undefined;
  USER_KEY: string = '[user]';

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = undefined;
    }
  }

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

  login() {
    this.user = {
      userName: 'AlexanderPanagyurski',
      email: 'alexander.panagyurski@gmail.com',
      password: '123456'
    }

    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
  }
}
