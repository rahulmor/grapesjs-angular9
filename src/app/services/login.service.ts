import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginData = [];

  private API_SERVER = "http://localhost:3000/login_check";
  private USER_SERVER = "https://api-test.plista.com/se/users/me";

  constructor(private http: HttpClient, private router: Router,) { }

  public sendGetRequest() {
    return this.http.get(this.API_SERVER, { withCredentials: true });
  }
  public sendGetRequestUser() {
    return this.http.get(this.USER_SERVER);
  }

  login_check() {
    return this.http.get<any>(this.API_SERVER);
  }
  users_login() {
    const data = this.http.get(this.USER_SERVER).subscribe(resp1 => {
      return resp1;
    });
    return data;
  }
}