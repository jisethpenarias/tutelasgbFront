import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCrearUsuarioComponent } from '../dialog-crear-usuario/dialog-crear-usuario.component';
import { Usuario } from '../../models/usuario';
import { FiltroUsuario } from '../../models/filtroUsuario';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDesactivarUsuarioComponent } from '../dialog-desactivar-usuario/dialog-desactivar-usuario.component';
import {SpinnerComponent} from '../../spinner/spinner.component';
import {UtilidadesService} from '../../services/utilidades.service';


@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  displayedColumns: string[] = ['username', 'email', 'fechaCreacion', 'acciones'];
  data: Usuario[];
  filtro: FiltroUsuario = {username: "", email: "", fechaDesde: null, fechaHasta: null};
  dialogCreacion;
  dialogDesactivar;


  constructor(public dialog: MatDialog,
              private usuarioService: UsuarioService,
              private utilidadesService: UtilidadesService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.utilidadesService.controlAcceso();
    this.filtrar();
  }

  openDialog() {
    this.dialogCreacion = this.dialog.open(DialogCrearUsuarioComponent, {data: {usuario: null, titulo: 'Crear', boton: 'Crear'}});
    this.dialogCreacion.afterClosed().subscribe((result) => {
      if (result !== null && result !== "") {
        this._snackBar.open(result, 'Ok', {
          duration: 2000,
        });
        this.filtrar();
      }
    });
  }

  openDialogDesactivar(idUsuario: number) {
    this.dialogDesactivar = this.dialog.open(DialogDesactivarUsuarioComponent, {data: idUsuario});
    this.dialogDesactivar.afterClosed().subscribe((result) => {
      if (result !== null && result !== "") {
        this._snackBar.open(result, 'Ok', {
          duration: 2000,
        });
        this.filtrar();
      }
    });
  }

  borrar() {
    this.filtro.email="";
    this.filtro.username="";
    this.filtro.fechaDesde = null;
    this.filtro.fechaHasta = null;
    this.filtrar();
  }

  editar(idUsuario: number) {
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    this.usuarioService.obtenerUsuario(idUsuario).subscribe(
      (usuario: any) => {
        this.dialogCreacion = this.dialog.open(DialogCrearUsuarioComponent, {data: {usuario: usuario, titulo: 'Editar', boton: 'Editar'}} );
        this.dialogCreacion.afterClosed().subscribe((result) => {
          if (result !== null && result !== "") {
            this._snackBar.open(result, 'Ok', {
              duration: 2000,
            });
            this.filtrar();
          }
        });
        spinnerRef.close();
      });
  }

  filtrar() {
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    this.usuarioService.obtener(this.filtro)
    .subscribe((usuarios: Usuario[]) => {
      this.data = usuarios;
      spinnerRef.close();
    });
  }
}
