import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPage } from '../offer/add/add.page';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/discover',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: MainPage,
    children: [
      {
        path: 'discover', children: [
          {
            path: '',
            loadChildren: () => import('../offer/discover/discover.module').then(m => m.DiscoverPageModule)
          }
        ],
      }
      // ,
      // {
      //   path: 'favorite', children:[
      //     {
      //         path: '',
      //         loadChildren: () => import('../offer/favorites/favorites.module').then( m => m.FavoritesPageModule)
      //       },
      //   ]
      // }
    ]
  },{
    path:"add",
    component:AddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
