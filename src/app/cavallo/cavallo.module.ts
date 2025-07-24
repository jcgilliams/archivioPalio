import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CavalloPageRoutingModule } from './cavallo-routing.module';
import { CavalloPage } from './cavallo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CavalloPageRoutingModule
  ],
  declarations: [CavalloPage]
})
export class CavalloPageModule {}
