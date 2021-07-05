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

@Component({
  selector: 'app-tutelas',
  templateUrl: './tutelas.component.html',
  styleUrls: ['./tutelas.component.css']
})
export class TutelasComponent implements OnInit {

  filtroTutela: FiltroTutela = {idCliente: null, idTutela: null, etapas: [], fechaDesde: null, fechaHasta: null};
  etapaFiltro: string = '';

  clienteFiltro: FiltroCliente = {nombre: null, direccion: null, email: null, tipoDocumento: null, documento: null, fechaDesde: null, fechaHasta: null};
  etapaOpciones: SelectOpciones[];
  clienteOpciones: SelectOpciones[];
  data: Tutela[];

  displayedColumns: string[] = ['id', 'hechos', 'peticion', 'etapa', 'cliente', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dialogRadicacion;

  parametrosComponente:any;

  constructor(private clienteService: ClienteService,
              private tutelaService: TutelaService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute) { }

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
        data: {tutela: null, titulo: 'Radicar', boton: 'Radicar tutela'},
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
    this.dialogRadicacion = this.dialog.open(DialogTrazaEtapasComponent, {data: idTutela});
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
            data: {tutela: {...tutela}, titulo: 'Editar', boton: 'Editar tutela'},
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

  filtrar() {
    if (this.etapaFiltro !== '') {
      this.filtroTutela.etapas = [];
      this.filtroTutela.etapas.push(this.etapaFiltro);
    }
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
