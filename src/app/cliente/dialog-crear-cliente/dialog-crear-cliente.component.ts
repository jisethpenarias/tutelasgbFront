import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente';
import { ClienteCreacionEdicion } from 'src/app/models/clienteCreacion';
import { tiposDocumentos } from 'src/app/data/tiposDocumentos';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-crear-cliente',
  templateUrl: './dialog-crear-cliente.component.html',
  styleUrls: ['./dialog-crear-cliente.component.css']
})
export class DialogCrearClienteComponent implements OnInit {

  tiposDocumentos = tiposDocumentos;
  cliente: ClienteCreacionEdicion = {id: null, nombre:"", email:"", direccion:"", tipoDocumento:"", documento:"", urlPoder:""};

  clienteFormGroup = new FormGroup({
    nombreValidacion: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    emailValidacion: new FormControl('',[Validators.required, Validators.email]),
    direccionValidacion: new FormControl('',[Validators.required]),
    tipoDocumentoValidacion: new FormControl('',[Validators.required]),
    documentoValidacion: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    urlPoderValidacion: new FormControl('',[Validators.required])
  });

  constructor(private clienteService :ClienteService,
              public dialogRef: MatDialogRef<DialogCrearClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.cliente !== null) {
      this.cliente =  this.data.cliente;
    }
  }

  crearEditar() {

    if (this.data.titulo === 'Crear'){
      console.log(this.cliente);
      this.clienteService.crear(this.cliente)
      .subscribe(
        (clienteCreado: Cliente) => {
          this.dialogRef.close('Cliente Creado Satisfactoriamente!');
        },
        (error: any) => {
          this.dialogRef.close(error.error.message);
        }
      )
    }
    if(this.data.titulo === 'Editar') {
      this.clienteService.editar(this.cliente)
      .subscribe((data) => {
        this.dialogRef.close('Cliente Editado Satisfactoriamente!');
      })
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
