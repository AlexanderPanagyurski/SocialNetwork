import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { AUTH_COOKIE_KEY } from "./constants";

const { apiUrl } = environment;

@Injectable()
class AppInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService) { }
    API_PREFIX = '/api';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authCookie: string = this.cookieService.get(AUTH_COOKIE_KEY);
        const headers = { 'Authorization': `Bearer ${authCookie}` }
        if (req.url.startsWith(this.API_PREFIX)) {
            req = req.clone({
                url: req.url.replace(this.API_PREFIX, apiUrl),
                setHeaders: headers
            });
        }

        return next.handle(req);
    }
}

export const appInterceptorProvider: Provider = {
    useClass: AppInterceptor,
    multi: true,
    provide: HTTP_INTERCEPTORS,
    deps: [CookieService]
} 