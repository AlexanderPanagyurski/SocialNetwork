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

    var response = this.http.get<User[]>(`${apiUrl}/users`);
    return response;
  }

  getUserId(userId: string) {
    const { apiUrl } = environment;

    var response = this.http.get<User>(`${apiUrl}/${userId}`);

    return response;
  }
}
