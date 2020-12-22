import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_SERVER = "https://api-test.plista.com/se/authorization/login_check";
  private USER_SERVER = "https://api-test.plista.com/se/users/me";

  constructor(private http: HttpClient) { }

  public sendGetRequest(){
    return this.http.get(this.API_SERVER);
  }
  public sendGetRequestUser(){
    return this.http.get(this.USER_SERVER);
  }

  login_check(){
    const data =  this.http.get<any>(this.API_SERVER).subscribe(resp=>{
      console.log("resp==",resp);
      return resp;
    });
    console.log("resp data==",data);
    return data;
  }
  users_login(){
    const data =  this.http.get<any>(this.USER_SERVER).subscribe(resp1=>{
      console.log("user resp==",resp1);
      return resp1;
    });
    console.log("resp user data==",data);
    return data;
  }
}