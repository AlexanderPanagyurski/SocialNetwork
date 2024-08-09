import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { GlobalLoaderService } from '../services/global-loader.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.userService.getProfile().subscribe({
        next: () => {
          this.isAuthenticating = false;
        },
        error: () => {
          this.isAuthenticating = false;
        },
        complete: () => {
          this.isAuthenticating = false;
        },
      });
    }, 1000);
  }
}
