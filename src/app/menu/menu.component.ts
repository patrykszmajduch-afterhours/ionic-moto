import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserInfo } from '../auth/user-info';
// import * as firebase from 'firebase/app';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public currentUser: UserInfo = JSON.parse('{ "mail": "test@gmail.com", "userName": "test user name", "userId":"uuid losowe"}');
  public appPages = [//simple config for menu slider
    { title: 'Search', url: '/', icon: 'search'},
    // { title: 'Discover', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Messages', url: '/user/Trash', icon: 'mail' },
    // { title: 'Logout', url: '/log', icon: 'log-out', isAuth : this.auth.userIsAuthenticated },
    { title: 'Login', url: '/auth', icon: 'log-in', isAuth : !this.auth.userIsAuthenticated },
    // { title: 'Join!', url: '/auth', icon: 'log-in', isAuth : !this.auth.userIsAuthenticated },
  ];
  public userMenu =[
    { title: 'Favorites', url: '/offer/favorites', icon: 'heart' },
    { title: 'Messages', url: '/user/message', icon: 'mail' },
    { title: 'My offers', url: '/my-offers', icon: 'list' },
    // { title: 'Logout', url: '/', icon: 'log-out', isAuth : !this.auth.userIsAuthenticated },
    // { title: 'Login', url: '/auth', icon: 'log-in', isAuth : !this.auth.userIsAuthenticated },

  ]
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {//zmienic na observable
    // this.auth.getUserInfo.subscribe(obs=>{console.log("test");
  //   this.currentUser=obs;
  // this.auth.getUserInfo.then(el=>this.currentUser=el);
  }
  logOut(){
    this.auth.logout();
    this.router.navigate(['/auth']);
  }
  // goToAdd() {
  //   this.router.navigate(['/main/tabs/discover/add']);
  // }
}
