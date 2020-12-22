import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from '../services/login.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentUserLogged = this.loginService.sendGetRequest();
        if (currentUserLogged) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `${this.loginService.sendGetRequest()},`
                }
            });
        }
        return next.handle(request);
    }
}