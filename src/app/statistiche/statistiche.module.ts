import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatistichePageRoutingModule } from './statistiche-routing.module';

import { StatistichePage } from './statistiche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatistichePageRoutingModule
  ],
  declarations: [StatistichePage]
})
export class StatistichePageModule {}
