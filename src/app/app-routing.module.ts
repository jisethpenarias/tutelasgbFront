import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionClientesComponent } from './cliente/gestion-clientes/gestion-clientes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SolicitudesInformacionComponent } from './solicitud/solicitudes-informacion/solicitudes-informacion.component';
import { TutelasComponent } from './tutela/tutelas/tutelas.component';
import { GestionUsuariosComponent } from './usuario/gestion-usuarios/gestion-usuarios.component';

const routes: Routes = [
  {path: '',  component: DashboardComponent},
  {path: 'login',  component: LoginComponent},
  {path: 'perfil',  component: PerfilComponent},
  {path: 'gestion-usuarios',  component: GestionUsuariosComponent},
  {path: 'gestion-clientes',  component: GestionClientesComponent},
  {path: 'lista-tutelas',  component: TutelasComponent, data: {view: 'RADICADOR'}}, // redireccion para el radicador
  {path: 'tutelas-asignadas',  component: TutelasComponent, data: {view: 'ASIGNADAS'}}, // redireccion para asignadas
  {path: 'tutelas-archivadas',  component: TutelasComponent, data: {view: 'ARCHIVADAS'}}, // redireccion para archivadas
  {path: 'solicitudes-informacion',  component: SolicitudesInformacionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
