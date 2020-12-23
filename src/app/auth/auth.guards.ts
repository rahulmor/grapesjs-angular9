import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    user:any;
    constructor(
        private router: Router,
        private loginService: LoginService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // setInterval(()=>{
        //     this.loginService.login_check();
        // },3000)
        
        // .subscribe(
        //   data => {
        //     // this.router.navigate([this.returnUrl]);
        //     console.log("data==",data);
        //     return data;
        //   },
        //   error => {
        //     // this.error = error;
        //     // this.loading = false;
        //   });
        // console.log("user==",this.user);
        // if (this.user) {
        //     return true;
        // }
        // window.location.href = "https://login-test.plista.com/de/";
        return true;
    }
}