import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule)
  },
  // {
  //   path: 'offer',
  //   loadChildren: () => import('./offer/offer.module').then( m => m.OfferPageModule)
  // },
  {
    path: 'add',
    loadChildren: () => import('./offer/add/add.module').then(m => m.AddPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./user/messages/messages.module').then(m => m.MessagesPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./offer/favorites/favorites.module').then(m => m.FavoritesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
