import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionClientesComponent } from './cliente/gestion-clientes/gestion-clientes.component';
import { SolicitudesInformacionComponent } from './solicitud/solicitudes-informacion/solicitudes-informacion.component';
import { TutelasComponent } from './tutela/tutelas/tutelas.component';
import { GestionUsuariosComponent } from './usuario/gestion-usuarios/gestion-usuarios.component';

const routes: Routes = [
  {path: 'gestion-usuarios',  component: GestionUsuariosComponent},
  {path: 'gestion-clientes',  component: GestionClientesComponent},
  {path: 'lista-tutelas',  component: TutelasComponent},
  {path: 'solicitudes-informacion',  component: SolicitudesInformacionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
