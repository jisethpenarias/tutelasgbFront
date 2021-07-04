import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tiposDocumentos } from 'src/app/data/tiposDocumentos';
import { tiposAnexos } from 'src/app/data/tiposAnexos';

import { Tutela } from 'src/app/models/radicarTutela';

@Component({
  selector: 'app-dialog-radicar-tutela',
  templateUrl: './dialog-radicar-tutela.component.html',
  styleUrls: ['./dialog-radicar-tutela.component.css']
})
export class DialogRadicarTutelaComponent implements OnInit {

  tutela: Tutela = {nombreAccionante:"", tipoDocumentoAccionante:"", documentoAccionante: "", direccionAccionante:"", telefonoAccionante:null,
                           celularAccionante:null, numRadicadoJuzgado:"", fechaRadicacionJuzgado:null};
  tiposDocumentos = tiposDocumentos;
  tiposAnexos = tiposAnexos;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
