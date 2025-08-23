import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { filter, map, Observable } from "rxjs";
import { UserService } from "../user/user.service";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private cookieService: CookieService,
        private userService: UserService,
        private router: Router) { }

    canActivate(): boolean {
        if (this.userService.isLogged) {
            return true;
        } else {
            this.router.navigate(['/login']); // Redirect to login if not logged in
            return false;
        }
    }
}