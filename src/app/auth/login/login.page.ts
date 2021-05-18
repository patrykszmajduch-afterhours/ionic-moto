import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLogin;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.isLogin=false;
  }

  onLogin(){
    this.authService.login();
    this.router.navigateByUrl('/home');
  }

  onSwitchMode(){
    this.isLogin=!this.isLogin;
    // this.authService.send();
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    
    console.log(email,password);
    if(this.isLogin){
      //todo:serwis do wyslania logowanie
    }else{
      //todo:serwis do wyslania rejestracja
    }
  }
}
// export class SignInForm{
//   constructor(public mail:string,)
// }
