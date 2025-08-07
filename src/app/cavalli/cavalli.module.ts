import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CavalliPageRoutingModule } from './cavalli-routing.module';

import { CavalliPage } from './cavalli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CavalliPageRoutingModule
  ],
  declarations: [CavalliPage]
})
export class CavalliPageModule {}
