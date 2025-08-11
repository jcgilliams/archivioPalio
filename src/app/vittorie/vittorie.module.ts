import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VittoriePageRoutingModule } from './vittorie-routing.module';

import { VittoriePage } from './vittorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VittoriePageRoutingModule
  ],
  declarations: [VittoriePage]
})
export class VittoriePageModule {}
