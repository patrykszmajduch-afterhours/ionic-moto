import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from './user-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _currentUser: UserInfo =JSON.parse('{ "mail": "test@gmail.com", "userName": "test user name", "userId":"uuid losowe"}');
  // 
  // = new Observable.bind()
  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(private http: HttpClient) { }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }

  get getAuthorizationToken() {
    return null;
  }

  get getUserInfo(){//brac z localstorage
    // setTimeout(()=>console.log("test observable",3000))
    // return Observable.create(this._currentUser);
    // // new Observable((obs)=>{})
    return this._currentUser;
  }
}
