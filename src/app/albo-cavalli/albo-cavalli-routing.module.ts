import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlboCavalliPage } from './albo-cavalli.page';

const routes: Routes = [
  {
    path: '',
    component: AlboCavalliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlboCavalliPageRoutingModule {}
