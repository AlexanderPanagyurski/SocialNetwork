import { Component, Input } from '@angular/core';
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

  constructor(private globalLoaderService: GlobalLoaderService) { }

  cleanUsersCollections() {
    this.userFollowers = [];
  }
}
