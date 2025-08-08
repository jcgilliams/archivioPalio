import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContradaPage } from './contrada.page';

const routes: Routes = [
  {
    path: '',
    component: ContradaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContradaPageRoutingModule {}
