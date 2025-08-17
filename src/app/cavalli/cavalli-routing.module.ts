import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CavalliPage } from './cavalli.page';

const routes: Routes = [
  {
    path: '',
    component: CavalliPage
  },  {
    path: 'decennio',
    loadChildren: () => import('./decennio/decennio.module').then( m => m.DecennioPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CavalliPageRoutingModule {}
