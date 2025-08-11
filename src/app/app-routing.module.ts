import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cavallo/:id',
    loadChildren: () => import('./cavallo/cavallo.module').then( m => m.CavalloPageModule)
  },
  {
    path: 'fantino/:id',
    loadChildren: () => import('./fantino/fantino.module').then( m => m.FantinoPageModule)
  },
  {
    path: 'cavalli',
    loadChildren: () => import('./cavalli/cavalli.module').then( m => m.CavalliPageModule)
  },
  {
    path: 'palio/:slug',
    loadChildren: () => import('./palio/palio.module').then( m => m.PalioPageModule)
  },
  {
    path: 'contrada/:nome',
    loadChildren: () => import('./contrada/contrada.module').then( m => m.ContradaPageModule)
  },
  {
    path: 'fantini',
    loadChildren: () => import('./fantini/fantini.module').then( m => m.FantiniPageModule)
  },
  {
    path: 'vittorie',
    loadChildren: () => import('./vittorie/vittorie.module').then( m => m.VittoriePageModule)
  },
  {
    path: 'contrade',
    loadChildren: () => import('./contrade/contrade.module').then( m => m.ContradePageModule)
  },
  {
    path: 'statistiche',
    loadChildren: () => import('./statistiche/statistiche.module').then( m => m.StatistichePageModule)
  },
  {
    path: 'albo-cavalli/:anno',
    loadChildren: () => import('./albo-cavalli/albo-cavalli.module').then( m => m.AlboCavalliPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
