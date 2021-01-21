import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'grapes-angular';
  loginUrl = 'https://login-test.plista.com/de/';
  constructor(public loginService: LoginService, private router: Router) {

  }
  ngOnInit() {
    setInterval(() => {
      this.loginService.login_check().subscribe(resp => {
        if (resp.data === false) {
          window.location.href = this.loginUrl;
        }
      });
    }, 150000);
  }
}