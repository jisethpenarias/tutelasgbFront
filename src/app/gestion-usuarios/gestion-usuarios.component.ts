import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCrearUsuarioComponent } from '../dialog-crear-usuario/dialog-crear-usuario.component';
import { Usuario } from '../models/usuario';
import { FiltroUsuario } from '../models/filtroUsuario';
import { UsuarioService } from '../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  displayedColumns: string[] = ['username', 'email', 'fechaCreacion', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: Usuario[];
  filtro: FiltroUsuario = {username: "", email: "", fechaDesde: null, fechaHasta: null};
  dialogCreation;


  constructor(public dialog: MatDialog,
              private usuarioService:UsuarioService,
              private _snackBar: MatSnackBar) { }

  openDialog() {
    this.dialogCreation = this.dialog.open(DialogCrearUsuarioComponent);
    this.dialogCreation.afterClosed().subscribe(result => {
      this._snackBar.open(result, 'Ok', {
        duration: 2000,
      });
      this.filtrar();
    });
  }

  ngOnInit(): void {
    this.filtrar();
  }

  borrar() {
    this.filtro.email="";
    this.filtro.username="";
    this.filtro.fechaDesde = null;
    this.filtro.fechaHasta = null;
    this.filtrar();
  }

  editar() {
    console.log('editando');
  }

  desactivar(idUsuario: number) {
    this.usuarioService.desactivar(idUsuario).subscribe(
      (data) => {
        this._snackBar.open('Usuario Desactivado', 'Ok', {
          duration: 2000,
        });
        this.filtrar();
      },
      (error) => {
        this._snackBar.open('Ocurrio un error', 'Ok', {
          duration: 2000,
        });
      }
    )
  }

  filtrar() {
    this.usuarioService.obtener(this.filtro)
    .subscribe((usuarios: Usuario[]) => {
      this.data = usuarios;
    })
  }
}
