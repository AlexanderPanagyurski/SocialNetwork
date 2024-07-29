import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-users-popup',
  templateUrl: './users-popup.component.html',
  styleUrls: ['./users-popup.component.css']
})
export class UsersPopupComponent {
  @Input() userFollowers: User[] = [] as User[];
  @ViewChild('userModalClose') userModalClose: any;


  constructor(
    private router: Router,
    private globalLoaderService: GlobalLoaderService) { }

  cleanUsersCollections() {
    this.userFollowers = [];
  }
  
  onSelect(user: User) {
    this.userModalClose.nativeElement.click();
    this.router.navigate(['users', user.userId]);
  }

}
