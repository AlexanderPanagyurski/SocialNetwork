import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../types/user';
import { UserForAuth } from '../types/userForAuth';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AUTH_COOKIE_KEY } from '../constants';
import { Post } from '../types/post';

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

  getUsersByUsername(username: string) {
    let url = '/api/search';
    if (username) {
      url += `?username=${username}`;
    }
    const response = this.http.get<User[]>(url);
    return response;
  }

  getFavouritePosts(userId: string) {
    const response = this.http.get<Post[]>(`/api/users/${userId}/favourite-posts`);

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

  edit(formData: FormData, userId: string) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    headers.set('Accept', '*/*');
    const response = this.http.put<User>(`/api/users/${userId}/edit`, formData, { headers });

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

  get userProfileImageUrl(): string {
    if (this.user?.profileImageUrl) {
      return `data:image/JPEG;base64,${this.user.profileImageUrl}`;
    }
    return '../../../assets/images/default-profile-image.png';
  }

  getUserProfileImageUrl(user: User) {
    if (user.profileImageUrl) {
      return `data:image/JPEG;base64,${user.profileImageUrl}`;
    }
    return '../../../assets/images/default-profile-image.png';
  }


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
