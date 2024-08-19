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
  searchedUsers: User[] = [];

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

  get searchedUsersCount(): number {
    return this.searchedUsers.length;
  }


  searchUser(event: any) {
    let username = event.target.value;
    this.userService.getUsersByUsername(username).subscribe({
      next: (response) => {
        console.log(response);
        this.searchedUsers = response;
      },
      error: (error) => {
        console.log('Error: ', error);
      }
    })
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
