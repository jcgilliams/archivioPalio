import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CavalloPage } from './cavallo.page';

const routes: Routes = [
  {
    path: '',
    component: CavalloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CavalloPageRoutingModule {}
