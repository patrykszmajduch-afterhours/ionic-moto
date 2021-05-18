import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
          },
          // {
          //   path: ':id',
          //   loadChildren: () => import('../offer/details/details.module').then(m => m.DetailsPageModule)
          // }
        ],
      },
      {
        path: 'favorite', children:[
          {
              path: '',
              loadChildren: () => import('../offer/favorites/favorites.module').then( m => m.FavoritesPageModule)
            },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
