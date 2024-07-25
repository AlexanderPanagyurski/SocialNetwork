import { Component, OnInit } from '@angular/core';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private globalLoaderService: GlobalLoaderService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  private fetchUsers() {
    this.globalLoaderService.showLoader();
    
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        this.globalLoaderService.hideLoader();
        console.log('Error: ', err);
      }
    });
  }
}
