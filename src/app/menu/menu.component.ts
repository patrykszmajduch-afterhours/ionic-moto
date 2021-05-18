import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserInfo } from '../auth/user-info';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public currentUser:UserInfo;
  public appPages = [//simple config for menu slider
    { title: 'Search', url: '/', icon: 'search'},
    // { title: 'Discover', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Messages', url: '/user/Trash', icon: 'mail' },
    { title: 'Logout', url: '/log', icon: 'log-out', isAuth : !this.auth.userIsAuthenticated },
    { title: 'Login', url: '/auth', icon: 'log-in', isAuth : !this.auth.userIsAuthenticated },
    { title: 'Join!', url: '/auth', icon: 'log-in', isAuth : !this.auth.userIsAuthenticated },
  ];
  public userMenu =[
    { title: 'Favorites', url: '/offer/favorites', icon: 'heart' },
    { title: 'Messages', url: '/user/message', icon: 'mail' },
    { title: 'My offers', url: '/offer/discover/user', icon: 'list' },
    // { title: 'Logout', url: '/', icon: 'log-out', isAuth : !this.auth.userIsAuthenticated },
    // { title: 'Login', url: '/auth', icon: 'log-in', isAuth : !this.auth.userIsAuthenticated },

  ]
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private auth:AuthService) { }

  ngOnInit() {//zmienic na observable
    // this.auth.getUserInfo.subscribe(obs=>{console.log("test");
  //   this.currentUser=obs;
  // });
  this.currentUser = this.auth.getUserInfo;
  }

}