import { Component, OnInit } from '@angular/core';
import { etapas } from 'src/app/data/etapas';
import { FiltroCliente } from 'src/app/models/filtroCliente';
import { Tutela } from 'src/app/models/tutela';
import { FiltroTutela } from 'src/app/models/filtroTutela';
import { SelectOpciones } from 'src/app/models/selectOpciones';
import { ClienteService } from 'src/app/services/cliente.service';
import { TutelaService } from 'src/app/services/tutela.service';
import { DialogRadicarTutelaComponent } from '../dialog-radicar-tutela/dialog-radicar-tutela.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogTrazaEtapasComponent } from '../dialog-traza-etapas/dialog-traza-etapas.component';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {DialogReasignarTutelaComponent} from '../dialog-reasignar-tutela/dialog-reasignar-tutela.component';
import {DialogFalloComponent} from '../dialog-fallo/dialog-fallo.component';
import {LocalstorageService} from '../../services/localstorage.service';
import {DialogCrearSolicitudInformacionComponent} from '../../solicitud/dialog-crear-solicitud-informacion/dialog-crear-solicitud-informacion.component';

@Component({
  selector: 'app-tutelas',
  templateUrl: './tutelas.component.html',
  styleUrls: ['./tutelas.component.css']
})
export class TutelasComponent implements OnInit {

  filtroTutela: FiltroTutela = {idCliente: null, idTutela: null, etapas: [], fechaDesde: null, fechaHasta: null, idUsuario: null};
  etapaFiltro: string = '';

  clienteFiltro: FiltroCliente = {nombre: null, direccion: null, email: null, tipoDocumento: null, documento: null, fechaDesde: null, fechaHasta: null};
  etapaOpciones: SelectOpciones[];
  clienteOpciones: SelectOpciones[];
  data: Tutela[];

  displayedColumns: string[] = ['id', 'hechos', 'peticion', 'etapa', 'cliente', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dialogRadicacion;
  dialogTrazaTutelas;
  dialogReasignacion;
  dialogNoImpugnacion;
  dialogSolicitudes;

  parametrosComponente:any;

  constructor(private clienteService: ClienteService,
              private tutelaService: TutelaService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private localStorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(take(1)).subscribe((data) => {
      this.parametrosComponente = data;

      if (this.parametrosComponente.view === 'ARCHIVADAS') {
        this.etapaOpciones = etapas.filter(etapa => etapa.value === 'ARCHIVADA_SIN_IMPUGNACION' ||  etapa.value === 'ARCHIVADA_CON_IMPUGNACION');
        this.filtroTutela = {...this.filtroTutela, etapas: this.etapaOpciones.map(etapaOpcion => etapaOpcion.value)};
      }
      if (this.parametrosComponente.view === 'ASIGNADAS') {
        this.etapaOpciones = etapas.filter(etapa => etapa.value !== 'ARCHIVADA_SIN_IMPUGNACION' &&  etapa.value !== 'ARCHIVADA_CON_IMPUGNACION' &&  etapa.value !== null);
        this.filtroTutela = {...this.filtroTutela, etapas: this.etapaOpciones.map(etapaOpcion => etapaOpcion.value)};
      }
      if (this.parametrosComponente.view === 'RADICADOR') {
        this.etapaOpciones = etapas;
        this.filtroTutela = {...this.filtroTutela, etapas: this.etapaOpciones.map(etapaOpcion => etapaOpcion.value)};
      }
    });

    this.clienteOpciones = [];
    this.clienteService.obtener(this.clienteFiltro).
    subscribe((clientes: any[]) => {
        clientes.forEach(cliente => {
          this.clienteOpciones.push({viewValue: cliente.nombre, value: cliente.id});
        });
       }
    );
    this.filtrar();
  }

  openDialog() {
    this.dialogRadicacion = this.dialog.open(
      DialogRadicarTutelaComponent,
      {
        data: {tutela: null, titulo: 'Radicar', boton: 'Radicar tutela', llamadoDesde: this.parametrosComponente.view},
        minWidth: 800,
        maxWidth: 1000,
        disableClose: true
      });
    this.dialogRadicacion.afterClosed().subscribe((result) => {
      if (result !== null && result !== "") {
        this._snackBar.open(result, 'Ok', {
          duration: 2000,
        });
        this.filtrar();
      }
    });
  }

  openDialogTraza(idTutela: number) {
    this.dialogTrazaTutelas = this.dialog.open(DialogTrazaEtapasComponent, {data: idTutela});
  }

  openDialogSolicitudes(idTutela: number) {
    this.dialogSolicitudes = this.dialog.open(
      DialogCrearSolicitudInformacionComponent,
      {
        data: {solicitud: null, titulo: 'Crear Solicitud Informacion', accion: 'CREAR', tutela: idTutela},
        disableClose: true
      });
    this.dialogSolicitudes.afterClosed().subscribe((result) => {
      if (result === '') {
        return;
      }
      if (result === 'Creada'){
        this._snackBar.open('Solicitud creada satisfactoriamente.', 'Ok');
      }else {
        this._snackBar.open(result.error.message, 'Ok');
      }
    });
  }

  borrar() {
    this.filtroTutela.idCliente = null;
    this.filtroTutela.idTutela = null;
    this.etapaFiltro = '';
    if (this.parametrosComponente.view === 'ARCHIVADAS') {
      this.filtroTutela = {...this.filtroTutela, etapas: this.etapaOpciones.map(etapaOpcion => etapaOpcion.value)};
    }
    if (this.parametrosComponente.view === 'ASIGNADAS') {
      this.filtroTutela = {...this.filtroTutela, etapas: this.etapaOpciones.map(etapaOpcion => etapaOpcion.value)};
    }
    if (this.parametrosComponente.view === 'RADICADOR') {
      this.filtroTutela = {...this.filtroTutela, etapas: this.etapaOpciones.map(etapaOpcion => etapaOpcion.value)};
    }
    this.filtroTutela.fechaDesde = null;
    this.filtroTutela.fechaHasta = null;
    this.filtrar();
  }

  editar(idTutela: number) {
    this.tutelaService.obtenerTutela(idTutela).subscribe(
      (tutela: Tutela) => {
        this.dialogRadicacion = this.dialog.open(
          DialogRadicarTutelaComponent,
          {
            data: {tutela: {...tutela}, titulo: 'Editar', boton: 'Editar tutela', llamadoDesde: this.parametrosComponente.view},
            minWidth: 800,
            maxWidth: 1000,
            disableClose: true
          });
        this.dialogRadicacion.afterClosed().subscribe((result) => {
          if (result !== null && result !== "") {
            this._snackBar.open(result, 'Ok', {
              duration: 2000,
            });
            this.filtrar();
          }
        });
      });
  }

  reasignarTutela(idTutela: number) {
    this.dialogReasignacion = this.dialog.open(DialogReasignarTutelaComponent,
      { data: idTutela,
        minWidth: 230,
        maxWidth: 230,
        disableClose: true
      });
    this.dialogReasignacion.afterClosed().subscribe((result) => {
      if  (result === '') {
        return;
      }
      if (result === 'Reasignado') {
        this._snackBar.open('La tutela ha sido reasignada satisfactoriamente.', 'Ok');
        this.filtrar();
      } else {
        this._snackBar.open('Ocurrió un error en la reasignación, por favor intente unos segundos mas tarde.', 'Ok');
      }
    });
  }

  noImpugar(idTutela: number) {
    this.dialogNoImpugnacion = this.dialog.open(DialogFalloComponent,
      {
        data: idTutela,
        minWidth: 300,
        maxWidth: 300
      });
    this.dialogNoImpugnacion.afterClosed().subscribe((result) => {
      if  (result === '') {
        return;
      }
      if (result === 'Archivado') {
        this._snackBar.open('La tutela ha sido archivada sin impugnacion.', 'Ok');
        this.filtrar();
      } else {
        this._snackBar.open('Ocurrio un error en la archivacion de la tutela, por favor intente unos segundos mas tarde.', 'Ok');
      }
    });
  }

  filtrar() {
    if (this.etapaFiltro !== '') {
      this.filtroTutela.etapas = [];
      this.filtroTutela.etapas.push(this.etapaFiltro);
    }

    this.filtroTutela.idUsuario = this.localStorageService.usuarioLogueado.id;
    this.tutelaService.obtener(this.filtroTutela)
    .subscribe((tutelas: Tutela[]) => {
      this.data = tutelas;
      this.data = this.data
        .map(tutela => {
          return {...tutela,
            etapa: tutela.etapa === 'RADICADA' ? 'Radicada' :
                   tutela.etapa === 'ASIGNADA' ? 'Asignada' :
                   tutela.etapa === 'REVISION_RESPUESTA_CLIENTE' ?  'Revision respuesta' :
                   tutela.etapa === 'RESPONDIDA' ? 'Respondida' :
                   tutela.etapa === 'FALLO' ? 'Fallo' :
                   tutela.etapa === 'REVISION_IMPUGNACION_CLIENTE' ? 'Revision impugnacion' :
                   tutela.etapa === 'IMPUGNACION' ? 'Impugnacion' :
                   tutela.etapa === 'ARCHIVADA_SIN_IMPUGNACION' ? 'Archivada sin impugnacion' :
                   tutela.etapa === 'ARCHIVADA_CON_IMPUGNACION' ? 'Archivada con impugnacion' : tutela.etapa};
        });
    });
  }
}
