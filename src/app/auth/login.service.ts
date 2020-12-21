import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_SERVER = "https://api-test.plista.com/se/authorization/login_check";
  private USER_SERVER = "https://api-test.plista.com/se/users/me"

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.API_SERVER);
  }
  public sendGetRequestUser(){
    return this.httpClient.get(this.USER_SERVER);
  }
}