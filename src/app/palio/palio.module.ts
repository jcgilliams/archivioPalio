import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PalioPageRoutingModule } from './palio-routing.module';
import { PalioPage } from './palio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PalioPageRoutingModule
  ],
  declarations: [PalioPage]
})
export class PalioPageModule {}
