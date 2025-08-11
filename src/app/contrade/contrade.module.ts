import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContradePageRoutingModule } from './contrade-routing.module';

import { ContradePage } from './contrade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContradePageRoutingModule
  ],
  declarations: [ContradePage]
})
export class ContradePageModule {}
