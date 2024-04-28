import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleDispositivoPageRoutingModule } from './detalle-dispositivo-routing.module';

import { DetalleDispositivoPage } from './detalle-dispositivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleDispositivoPageRoutingModule
  ],
  declarations: [DetalleDispositivoPage]
})
export class DetalleDispositivoPageModule {}
