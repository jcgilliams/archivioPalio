import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlboCavalliPageRoutingModule } from './albo-cavalli-routing.module';

import { AlboCavalliPage } from './albo-cavalli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlboCavalliPageRoutingModule
  ],
  declarations: [AlboCavalliPage]
})
export class AlboCavalliPageModule {}
