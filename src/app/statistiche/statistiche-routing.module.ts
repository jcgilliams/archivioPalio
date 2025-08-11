import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatistichePage } from './statistiche.page';

const routes: Routes = [
  {
    path: '',
    component: StatistichePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatistichePageRoutingModule {}
