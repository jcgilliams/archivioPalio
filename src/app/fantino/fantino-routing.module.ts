import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FantinoPage } from './fantino.page';

const routes: Routes = [
  {
    path: '',
    component: FantinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FantinoPageRoutingModule {}
