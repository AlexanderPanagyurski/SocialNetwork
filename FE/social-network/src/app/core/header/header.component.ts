import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/types/user';
import { UserForAuth } from 'src/app/types/userForAuth';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = "SocialNetwork";

  constructor(
    private userService: UserService,
    private router: Router) { }

  get user(): UserForAuth {
    return this.userService.user!;
  }

  get userLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get userName(): string {
    return this.userService.user?.userName || '';
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
