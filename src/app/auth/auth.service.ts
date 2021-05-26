import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from './user-info';
import { AngularFireAuth } from "@angular/fire/auth";
import { first } from 'rxjs/operators';
// import { User } from 'firebase';
// import { User } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  public ccUser:any;
  // private _currentUser: UserInfo = JSON.parse('{ "mail": "test@gmail.com", "userName": "test user name", "userId":"uuid losowe"}');
  readonly authState$: Observable<any | null> = this.fireAuth.authState;

  // 
  // = new Observable.bind()
  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(private http: HttpClient, private fireAuth: AngularFireAuth) { }

  get currentUser(){
    return this.fireAuth.currentUser;
  }

  async isLoggIn():Promise<any>{
    return await this.fireAuth.authState.pipe(first()).toPromise();
  }



  // login() {
  //   this._userIsAuthenticated = true;
  // }

  // logout() {
  //   this._userIsAuthenticated = false;
  // }


  get getAuthorizationToken() {
    return null;
  }

  get getUserInfo() {//brac z localstorage
    // setTimeout(()=>console.log("test observable",3000))
    // return Observable.create(this._currentUser);
    // // new Observable((obs)=>{})
    return this.fireAuth.currentUser;
  }



  get user(): any | null {
    return this.fireAuth.currentUser;
  }

  login({ email, password }: Credentials): Promise<any>{
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register({ email, password }: Credentials) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireAuth.signOut();
  }
}
export interface Credentials {
  email: string;
  password: string;
}
