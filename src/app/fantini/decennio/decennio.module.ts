import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecennioPageRoutingModule } from './decennio-routing.module';

import { DecennioPage } from './decennio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecennioPageRoutingModule
  ],
  declarations: [DecennioPage]
})
export class DecennioPageModule {}
