import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FantiniPage } from './fantini.page';

const routes: Routes = [
  {
    path: '',
    component: FantiniPage
  },  {
    path: 'decennio',
    loadChildren: () => import('./decennio/decennio.module').then( m => m.DecennioPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FantiniPageRoutingModule {}
