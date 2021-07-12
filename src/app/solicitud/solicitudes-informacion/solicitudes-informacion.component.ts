import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Solicitud } from 'src/app/models/solicitud';
import { DialogCrearSolicitudInformacionComponent } from '../dialog-crear-solicitud-informacion/dialog-crear-solicitud-informacion.component';
import {SolicitudService} from '../../services/solicitud.service';


@Component({
  selector: 'app-solicitudes-informacion',
  templateUrl: './solicitudes-informacion.component.html',
  styleUrls: ['./solicitudes-informacion.component.css']
})
export class SolicitudesInformacionComponent implements OnInit {

  filtroSolicitudes = {idTutela: null, fechaDesde: null, fechaHasta: null, estado: null};
  solicitudes: Solicitud[] = [];
  dialogSolicitud;
  estadosOpciones: string[] = ['CREADA', 'ACEPTADA', 'NEGADA'];

  displayedColumns: string[] = ['id', 'tutela', 'titulo', 'descripcion', 'estado', 'acciones'];

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private solicitudService: SolicitudService) { }

  ngOnInit(): void {
    console.log(this.filtroSolicitudes);
    this.filtrar();
  }

  verSolicitud(solicitud: Solicitud) {
    this.dialogSolicitud = this.dialog.open(
      DialogCrearSolicitudInformacionComponent,
      {
        data: { solicitud: solicitud, titulo: 'Ver Solicitud información', accion: 'VER', tutela: null },
        disableClose: true
      });
    this.dialogSolicitud.afterClosed().subscribe((result) => {
      if (result !== null && result !== "") {
        this._snackBar.open(result, 'Ok', {
          duration: 2000,
        });
        this.filtrar();
      }
    });
  }

  aceptarSolicitud(solicitud: Solicitud) {
    solicitud.estado = 'ACEPTADA';
    this.solicitudService.actualizarSolicitud(solicitud).subscribe(
      () => {
        this._snackBar.open('La solicitud ha sido aceptada.', 'Ok', {
          duration: 2000,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  negarSolicitud(solicitud: Solicitud) {
    solicitud.estado = 'NEGADA';
    this.solicitudService.actualizarSolicitud(solicitud).subscribe(
      () => {
        this._snackBar.open('La solicitud ha sido negada.', 'Ok', {
          duration: 2000,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  borrar() {
    this.filtroSolicitudes = {idTutela: null, fechaDesde: null, fechaHasta: null, estado: null};
    this.filtrar();
  }

  filtrar() {
    this.solicitudService.obtener(this.filtroSolicitudes).subscribe((solicitudesRespuesta: Solicitud[]) => {
      this.solicitudes = solicitudesRespuesta;
    });
  }

}
