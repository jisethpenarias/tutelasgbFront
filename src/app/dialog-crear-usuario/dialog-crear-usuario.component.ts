import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolOpcion } from '../models/rolOpcion';
import { Usuario } from '../models/usuario';
import { UsuarioCreacion } from '../models/usuarioCreacion';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-dialog-crear-usuario',
  templateUrl: './dialog-crear-usuario.component.html',
  styleUrls: ['./dialog-crear-usuario.component.css']
})
export class DialogCrearUsuarioComponent {

  usuario: UsuarioCreacion = {username:"", email:"", password:"", rol:null};
  paswordConfirma: string = "";

  rolesUsuario: RolOpcion[] = [
    {value: null, viewValue: "Seleccion un rol"},
    {value: "RADICADOR", viewValue: "Radicador"},
    {value: "INVESTIGADOR", viewValue: "Investigador"},
  ]

  constructor(private usuarioService :UsuarioService,
              public dialogRef: MatDialogRef<DialogCrearUsuarioComponent>) { }

  ngOnInit(): void {

  }

  crear() {
    this.usuarioService.crear(this.usuario)
    .subscribe(
      (usuarioCreado: Usuario) => {
        this.dialogRef.close('Usuario Creado Satisfactoriamente!');
      },
      (error: any) => {
        this.dialogRef.close(error.error.message);
      }
    )
  }


}
