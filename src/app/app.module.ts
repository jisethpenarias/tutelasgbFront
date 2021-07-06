import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarraLateralComponent } from './barra-lateral/barra-lateral.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { GestionUsuariosComponent } from './usuario/gestion-usuarios/gestion-usuarios.component';
import { DialogCrearUsuarioComponent } from './usuario/dialog-crear-usuario/dialog-crear-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogDesactivarUsuarioComponent } from './usuario/dialog-desactivar-usuario/dialog-desactivar-usuario.component';
import { DemoMaterialModule } from './material-module';
import { DialogCrearClienteComponent } from './cliente/dialog-crear-cliente/dialog-crear-cliente.component';
import { GestionClientesComponent } from './cliente/gestion-clientes/gestion-clientes.component';
import { DialogDesactivarClienteComponent } from './cliente/dialog-desactivar-cliente/dialog-desactivar-cliente.component';
import { TutelasComponent } from './tutela/tutelas/tutelas.component';
import { DialogRadicarTutelaComponent } from './tutela/dialog-radicar-tutela/dialog-radicar-tutela.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { DialogTrazaEtapasComponent } from './tutela/dialog-traza-etapas/dialog-traza-etapas.component';
import { SolicitudesInformacionComponent } from './solicitud/solicitudes-informacion/solicitudes-informacion.component';
import { DialogCrearSolicitudInformacionComponent } from './solicitud/dialog-crear-solicitud-informacion/dialog-crear-solicitud-informacion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DialogFalloComponent } from './tutela/dialog-fallo/dialog-fallo.component';
import { DialogReasignarTutelaComponent } from './tutela/dialog-reasignar-tutela/dialog-reasignar-tutela.component';


@NgModule({
  declarations: [
    AppComponent,
    BarraLateralComponent,
    GestionUsuariosComponent,
    DialogCrearUsuarioComponent,
    DialogDesactivarUsuarioComponent,
    DialogCrearClienteComponent,
    GestionClientesComponent,
    DialogDesactivarClienteComponent,
    TutelasComponent,
    DialogRadicarTutelaComponent,
    DialogTrazaEtapasComponent,
    SolicitudesInformacionComponent,
    DialogCrearSolicitudInformacionComponent,
    DashboardComponent,
    LoginComponent,
    PerfilComponent,
    DialogFalloComponent,
    DialogReasignarTutelaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    DemoMaterialModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
