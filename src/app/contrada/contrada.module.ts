import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContradaPageRoutingModule } from './contrada-routing.module';

import { ContradaPage } from './contrada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContradaPageRoutingModule
  ],
  declarations: [ContradaPage]
})
export class ContradaPageModule {}
