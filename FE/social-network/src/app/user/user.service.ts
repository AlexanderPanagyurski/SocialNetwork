import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../types/user';
import { UserForAuth } from '../types/userForAuth';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AUTH_COOKIE_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(
    private cookieService: CookieService,
    private http: HttpClient) {
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });
  }

  getUsers() {
    const { apiUrl } = environment;

    const response = this.http.get<User[]>(`${apiUrl}/users`);
    return response;
  }

  getUsersByUsername(username:string){
    const response = this.http.get<User[]>(`/api/search/${username}`);
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

  register(email: string, userName: string, password: string) {
    debugger;
    return this.http.post('/api/auth/register', { email, userName, password });
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('/api/auth/login', { email, password })
      .pipe(tap((user) => {
        this.user$$.next(user);
      }));
  }

  logout() {
    this.user = undefined;
    this.cookieService.delete(AUTH_COOKIE_KEY);
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('/api/users/profile')
      .pipe(tap(user => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
