import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/types/user';
import { UserForAuth } from 'src/app/types/userForAuth';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title: string = "SocialNetwork";
  currentUser: UserForAuth | undefined = undefined;
  private userSubscription!: Subscription;


  constructor(
    public userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  get user(): UserForAuth {
    return this.userService.user!;
  }

  get userLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get userName(): string {
    return this.currentUser?.userName || '';
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
