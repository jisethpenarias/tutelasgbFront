import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente';
import { ThemePalette } from '@angular/material/core';
import { ClienteCreacionEdicion } from 'src/app/models/clienteCreacion';
import { tiposDocumentos } from 'src/app/data/tiposDocumentos';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';
import {SpinnerComponent} from '../../spinner/spinner.component';

@Component({
  selector: 'app-dialog-crear-cliente',
  templateUrl: './dialog-crear-cliente.component.html',
  styleUrls: ['./dialog-crear-cliente.component.css']
})
export class DialogCrearClienteComponent implements OnInit {

  tiposDocumentos = tiposDocumentos;
  cliente: ClienteCreacionEdicion = {id: null, nombre: '', email: '', direccion: '', tipoDocumento: '', documento: '', urlPoder: ''};

  clienteFormGroup = new FormGroup({
    nombreValidacion: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    emailValidacion: new FormControl('',[Validators.required, Validators.email]),
    direccionValidacion: new FormControl('',[Validators.required]),
    tipoDocumentoValidacion: new FormControl('',[Validators.required]),
    documentoValidacion: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    urlPoderValidacion: new FormControl('',[Validators.required])
  });

  // Variables para el uploader
  fileControl: FormControl;
  multiple: boolean = false;
  accept: string = '.pdf';
  maxSize: number = 5;
  color: ThemePalette = 'primary';
  public files;

  constructor(private clienteService: ClienteService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<DialogCrearClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fileControl = new FormControl(this.files, [
      MaxSizeValidator(this.maxSize * 1024)
    ]);
  }

  ngOnInit(): void {
    if (this.data.cliente !== null) {
      this.cliente =  this.data.cliente;
    }

    this.fileControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
    });

  }

  crearEditar() {
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    if (this.data.titulo === 'Crear'){
      this.clienteService.crear(this.cliente)
      .subscribe(
        (clienteCreado: Cliente) => {
          if (this.files.length > 0 ) {
            this.clienteService.subirPoder(this.files, 'poder' + clienteCreado.id + '.pdf', clienteCreado.id)
              .subscribe((response) => {
                  spinnerRef.close();
                  this.dialogRef.close('Cliente Creado Satisfactoriamente!');
                  this.files = [];
                },
                (error) => {
                  spinnerRef.close();
                  this.files = [];
                  this.dialogRef.close('ocurrio un error en la subida del archivo');
                }
              );
          }
          spinnerRef.close();
        },
        (error: any) => {
          spinnerRef.close();
          this.dialogRef.close(error.error.message);
        }
      );
    }
    if ( this.data.titulo === 'Editar') {
      this.clienteService.editar(this.cliente)
      .subscribe((data) => {
        if (this.files.length > 0 ) {
          this.clienteService.subirPoder(this.files, 'poder' + this.cliente.id + '.pdf', this.cliente.id)
            .subscribe((response) => {
                this.dialogRef.close('Cliente Editado Satisfactoriamente!');
                this.files = [];
              },
              (error) => {
                this.files = [];
                this.dialogRef.close('ocurrio un error en la subida del archivo');
              }
            );
        }
        this.dialogRef.close('Cliente Editado Satisfactoriamente!');
      });
    }
  }

  getErrorMessage(propiedad: string, error: string) {
    if (error === 'required') {
      return 'Debe introducir la infomación requerida';
    }

    if (propiedad === 'nombre' && error === 'minmax') {
      return 'El nombre de usuario debe tener entre 5 y 20 caracteres';
    }

    if (propiedad === 'email' && error === 'email') {
      return 'Debe digitar un Email valido';
    }
    return '';
  }
}
