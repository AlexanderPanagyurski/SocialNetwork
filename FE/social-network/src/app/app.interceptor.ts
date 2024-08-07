import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";

const { apiUrl } = environment;

@Injectable()
class AppInterceptor implements HttpInterceptor {
    API_PREFIX = '/api';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith(this.API_PREFIX)) {
            req = req.clone({
                url: req.url.replace(this.API_PREFIX, apiUrl),
                withCredentials: true,
            });
        }
        
        return next.handle(req);
    }
}

export const appInterceptorProvider: Provider = {
    useClass: AppInterceptor,
    multi: true,
    provide: HTTP_INTERCEPTORS
} 