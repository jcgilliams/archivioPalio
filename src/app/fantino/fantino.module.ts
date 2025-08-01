import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FantinoPageRoutingModule } from './fantino-routing.module';

import { FantinoPage } from './fantino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FantinoPageRoutingModule
  ],
  declarations: [FantinoPage]
})
export class FantinoPageModule {}
