import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VittoriePage } from './vittorie.page';

const routes: Routes = [
  {
    path: '',
    component: VittoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VittoriePageRoutingModule {}
