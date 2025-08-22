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

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.userService.isLogged) {
            this.router.createUrlTree(['/newsfeed']);
            return true;
        }
        return false
        return this.userService.user$.pipe(
            filter((user) => user !== undefined),
            map((user) => {
                if (!user) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            }))
    }
}