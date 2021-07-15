import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../models/usuario';
import { UsuarioCreacion } from '../../models/usuarioCreacion';
import { UsuarioService } from '../../services/usuario.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectOpciones } from 'src/app/models/selectOpciones';
import {SpinnerComponent} from '../../spinner/spinner.component';

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
    passwordValidacion: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    passwordConfirmacionValidacion: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    rolValidacion: new FormControl('',[Validators.required])
  });

  rolesUsuario: SelectOpciones[] = [
    {value: null, viewValue: "Seleccion un rol"},
    {value: "RADICADOR", viewValue: "Radicador"},
    {value: "INVESTIGADOR", viewValue: "Investigador"},
  ]

  constructor(private usuarioService :UsuarioService,
              public dialogRef: MatDialogRef<DialogCrearUsuarioComponent>,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.usuario !== null) {
      this.usuario =  this.data.usuario;
    }
  }

  crearEditar() {
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    if (this.data.titulo === 'Crear'){

      if(this.usuario.password !== this.paswordConfirma){
        this._snackBar.open('La contraseña y confirmacion no coinciden', 'Ok', {
          duration: 2000,
        });
        spinnerRef.close();
        return;
      }

      this.usuarioService.crear(this.usuario)
      .subscribe(
        (usuarioCreado: Usuario) => {
          spinnerRef.close();
          this.dialogRef.close('Usuario Creado Satisfactoriamente!');
        },
        (error: any) => {
          spinnerRef.close();
          this.dialogRef.close(error.error.message);
        }
      );
    }

    if(this.data.titulo === 'Editar') {
      this.usuarioService.editar(this.usuario)
      .subscribe((data) => {
        spinnerRef.close();
        this.dialogRef.close('Usuario Editado Satisfactoriamente!');
      }, (error: any) => {
        spinnerRef.close();
        this._snackBar.open('Ocurrio un error editando el usuario, por favor intente nuevamente.', 'Ok');
      });
    }
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
      return 'La confirmacion del password debe tener entre 5 y 20 caracteres';
    }

    if (propiedad === 'email' && error === 'email') {
      return 'Debe digitar un Email valido';
    }

    return '';
  }
}
