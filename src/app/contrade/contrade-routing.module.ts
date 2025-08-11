import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContradePage } from './contrade.page';

const routes: Routes = [
  {
    path: '',
    component: ContradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContradePageRoutingModule {}
