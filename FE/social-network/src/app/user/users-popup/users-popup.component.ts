import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
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
  
  navigateTo(path: string, user: User) {
    this.userModalClose.nativeElement.click();
    this.router.navigate([path, user.userId]);
  }

}
