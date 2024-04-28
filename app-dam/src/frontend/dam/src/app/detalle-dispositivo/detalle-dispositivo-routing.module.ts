import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleDispositivoPage } from './detalle-dispositivo.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleDispositivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleDispositivoPageRoutingModule {}
