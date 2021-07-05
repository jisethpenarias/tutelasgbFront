import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tiposDocumentos } from 'src/app/data/tiposDocumentos';
import { tiposAnexos } from 'src/app/data/tiposAnexos';

import { Tutela } from 'src/app/models/radicarTutela';
import { SelectOpciones } from 'src/app/models/selectOpciones';
import { ClienteService } from 'src/app/services/cliente.service';
import { FiltroCliente } from 'src/app/models/filtroCliente';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Derecho} from '../../models/derecho';
import {tutela} from '../../data/tutela';

@Component({
  selector: 'app-dialog-radicar-tutela',
  templateUrl: './dialog-radicar-tutela.component.html',
  styleUrls: ['./dialog-radicar-tutela.component.css']
})
export class DialogRadicarTutelaComponent implements OnInit {

  tutela: Tutela = {...tutela};

  tutelaFormGroup = new FormGroup({
    fechaRadicacionJuzgadoValidacion: new FormControl('', [Validators.required]),
    numRadicadoJuzgadoValidacion: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    documentoAccionanteValidacion: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    tipoDocumentoAccionanteValidacion: new FormControl('',[Validators.required]),
    nombreAccionanteValidacion: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(100)])
  });

  tiposDocumentos = tiposDocumentos;
  tiposAnexos = tiposAnexos;
  clienteOpciones: SelectOpciones[];
  clienteFiltro: FiltroCliente = {nombre: null, direccion: null, email: null, tipoDocumento: null, documento: null, fechaDesde: null, fechaHasta: null};


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteOpciones = [];
    this. // contexto del componente
    clienteService. // uso del servicio de clientes inyectado
    obtener(this.clienteFiltro).// llamado al metodo de cliente service para obtener los clientes
    subscribe(// la suscipcion a la respuesta observable del metodo obtener
      // funcion que controla el caso de exito de la request
      (clientes: any[]) => {
        clientes.forEach(cliente => {
          this.clienteOpciones.push({viewValue: cliente.nombre, value: cliente.id})
        });
       }
    );
  }

  getErrorMessage(propiedad: string, error: string) {
    if (error === 'required') {
      return 'Debe introducir la infomación requerida';
    }

    if (propiedad === 'nombreAccionante' && error === 'minmax') {
     return 'El nombre del accionante debe tener entre 4 y 100 caracteres';
    }

    if (propiedad === 'documentoAccionante' && error === 'minmax') {
      return 'El documento del accionante debe tener entre 4 y 20 caracteres';
    }

    if (propiedad === 'numRadicadoJuzgado' && error === 'minmax') {
      return 'El numero de radicado del juzgado debe tener entre 1 y 50 caracteres';
    }

  }

}
