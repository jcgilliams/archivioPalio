import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PalioPage } from './palio.page';

const routes: Routes = [
  {
    path: '',
    component: PalioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PalioPageRoutingModule {}
