import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Solicitud } from 'src/app/models/solicitud';
import { DialogCrearSolicitudInformacionComponent } from '../dialog-crear-solicitud-informacion/dialog-crear-solicitud-informacion.component';
import {SolicitudService} from '../../services/solicitud.service';
import {SpinnerComponent} from '../../spinner/spinner.component';


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
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    this.solicitudService.actualizarSolicitud(solicitud).subscribe(
      () => {
        this._snackBar.open('La solicitud ha sido aceptada.', 'Ok', {
          duration: 2000,
        });
        spinnerRef.close();
      },
      (error) => {
        console.log(error);
        spinnerRef.close();
      }
    );
  }

  negarSolicitud(solicitud: Solicitud) {
    solicitud.estado = 'NEGADA';
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    this.solicitudService.actualizarSolicitud(solicitud).subscribe(
      () => {
        this._snackBar.open('La solicitud ha sido negada.', 'Ok', {
          duration: 2000,
        });
        spinnerRef.close();
      },
      (error) => {
        console.log(error);
        spinnerRef.close();
      }
    );
  }

  borrar() {
    this.filtroSolicitudes = {idTutela: null, fechaDesde: null, fechaHasta: null, estado: null};
    this.filtrar();
  }

  filtrar() {
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    this.solicitudService.obtener(this.filtroSolicitudes).subscribe((solicitudesRespuesta: Solicitud[]) => {
      this.solicitudes = solicitudesRespuesta;
      spinnerRef.close();
    },
      (error) => {
        console.log(error);
        spinnerRef.close();
      });
  }

}
