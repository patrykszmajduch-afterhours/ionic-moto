import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule),
    canLoad:[AuthGuard]
  },
  // {
  //   path: 'offer',
  //   loadChildren: () => import('./offer/offer.module').then( m => m.OfferPageModule)
  // },
  {
    path: 'add',
    loadChildren: () => import('./offer/add/add.module').then(m => m.AddPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./user/messages/messages.module').then(m => m.MessagesPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'favorites',
    loadChildren: () => import('./offer/favorites/favorites.module').then(m => m.FavoritesPageModule)
    ,
    canLoad: [AuthGuard]
  },
  {
    path: 'info',
    loadChildren: () => import('./user/info/info.module').then(m => m.InfoPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
