import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FantiniPageRoutingModule } from './fantini-routing.module';

import { FantiniPage } from './fantini.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FantiniPageRoutingModule
  ],
  declarations: [FantiniPage]
})
export class FantiniPageModule {}
