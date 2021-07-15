import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../services/usuario.service';
import {LocalstorageService} from '../services/localstorage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsuarioCreacion} from '../models/usuarioCreacion';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: UsuarioCreacion = { id: null, username: '', password: ''};
  confirmacionPassword: string;
  ocultarConfirmacionPass: boolean = true;
  ocultarPass: boolean = true;

  usuarioFormGroup = new FormGroup({
    usernameValidacion: new FormControl('', [Validators.required]),
    passwordValidacion: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    passwordConfirmaValidacion: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
  });

  constructor(
    private usuarioService: UsuarioService,
    private localstorageService: LocalstorageService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.usuarioService.obtenerUsuario(this.localstorageService.usuarioLogueado.id).subscribe(
      (usuarioRespuesta: UsuarioCreacion) => {
        this.usuario = usuarioRespuesta;
      },
      () => {
        this._snackBar.open('No se ha podido obtener la información del usuario, por favor intente nuevamente.', 'Ok');
      }
    );
  }

  submit() {
    if (this.usuario.password !== this.confirmacionPassword){
      this._snackBar.open('La contraseña y confirmacion no coinciden', 'Ok', {
        duration: 2000,
      });
      return;
    }

    this.usuarioService.editar(this.usuario).subscribe(
      () => {
        this._snackBar.open('El usuario ha sido actualizado satisfactoriamente.', 'Ok');
      },
      (error) => {
        this._snackBar.open('Ha ocurrido un error con la actualizacion del usuario.', 'Ok');
      }
    );
  }

  getErrorMessage(propiedad: string, error: string) {
    if (error === 'required') {
      return 'Debe introducir la infomación requerida';
    }

    if (propiedad === 'username' && error === 'minmax') {
      return 'El nombre de cliente debe tener entre 5 y 100 caracteres';
    }

    if (propiedad === 'password' && error === 'minmax') {
      return 'El password debe tener entre 5 y 20 caracteres';
    }

    if (propiedad === 'confirmacion' && error === 'minmax') {
      return 'La confirmación del password debe tener entre 5 y 20 caracteres';
    }

    return '';
  }

}
