import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.loginService.sendGetRequest;
        console.log("user==",user);
        if (user) {
            return true;
        }
        this.router.navigate(['https://login-test.plista.com/de/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}