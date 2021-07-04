import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../models/usuario';
import { UsuarioCreacion } from '../../models/usuarioCreacion';
import { UsuarioService } from '../../services/usuario.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectOpciones } from 'src/app/models/selectOpciones';

@Component({
  selector: 'app-dialog-crear-usuario',
  templateUrl: './dialog-crear-usuario.component.html',
  styleUrls: ['./dialog-crear-usuario.component.css']
})
export class DialogCrearUsuarioComponent {

  usuario: UsuarioCreacion = {id: null, username:"", email:"", password:"", rol:null};
  paswordConfirma: string = "";

  usuarioFormGroup = new FormGroup({
    usernameValidacion: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    emailValidacion: new FormControl('',[Validators.required, Validators.email]),
    passwordValidacion: new FormControl('',[Validators.required]),
    passwordConfirmacionValidacion: new FormControl('',[Validators.required]),
    rolValidacion: new FormControl('',[Validators.required])
  });

  rolesUsuario: SelectOpciones[] = [
    {value: null, viewValue: "Seleccion un rol"},
    {value: "RADICADOR", viewValue: "Radicador"},
    {value: "INVESTIGADOR", viewValue: "Investigador"},
  ]

  constructor(private usuarioService :UsuarioService,
              public dialogRef: MatDialogRef<DialogCrearUsuarioComponent>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.usuario !== null) {
      this.usuario =  this.data.usuario;
    }
  }

  crearEditar() {

    if (this.data.titulo === 'Crear'){

      if(this.usuario.password !== this.paswordConfirma){
        this._snackBar.open('La contraseña y confirmacion no coinciden', 'Ok', {
          duration: 2000,
        });
        return;
      }

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

    if(this.data.titulo === 'Editar') {
      this.usuarioService.editar(this.usuario)
      .subscribe((data) => {
        this.dialogRef.close('Usuario Editado Satisfactoriamente!');
      })
    }
  }

  getErrorMessage(propiedad: string, error: string) {
    if (error === 'required') {
      return 'Debe introducir la infomación requerida';
    }

    if (propiedad === 'username' && error === 'minmax') {
      return 'El nombre de cliente debe tener entre 5 y 100 caracteres';
    }

    if (propiedad === 'email' && error === 'email') {
      return 'Debe digitar un Email valido';
    }

    return '';
  }
}
