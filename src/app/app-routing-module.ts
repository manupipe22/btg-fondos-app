import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FondosLista } from './features/fondos/fondos-lista/fondos-lista';
import { SuscripcionForm } from './features/fondos/suscripcion-form/suscripcion-form';
import { HistorialTransacciones } from './features/historial/historial-transacciones/historial-transacciones';

const routes: Routes = [
  { path: '', redirectTo: 'fondos', pathMatch: 'full' },
  { path: 'fondos', component: FondosLista },
  { path: 'suscripcion', component: SuscripcionForm },
  { path: 'historial', component: HistorialTransacciones },
  { path: '**', redirectTo: 'fondos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
