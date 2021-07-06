import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Solicitud } from 'src/app/models/solicitudes';
import { DialogCrearSolicitudInformacionComponent } from '../dialog-crear-solicitud-informacion/dialog-crear-solicitud-informacion.component';


const ELEMENT_DATA: Solicitud[] = [
  {titulo: "solicitud", descripción: "descripcion", estado: "aceptada", id: 21, termino: new Date(), }
];

@Component({
  selector: 'app-solicitudes-informacion',
  templateUrl: './solicitudes-informacion.component.html',
  styleUrls: ['./solicitudes-informacion.component.css']
})
export class SolicitudesInformacionComponent implements OnInit {

  filtroDolicitudes = {idTutela:null, fechaDesde:null, fechaHasta:null}
  data: Solicitud[] = ELEMENT_DATA;
  dialogSolicitud;

  displayedColumns: string[] = ['titulo', 'descripción', 'estado', 'id', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openDialogSolicitud() {
    // este componente se reutiliza: se necesita validar cuando se crea y cuando solo se visualiza
    this.dialogSolicitud = this.dialog.open(
      DialogCrearSolicitudInformacionComponent,{data: {tutela: null, titulo: 'Solicitud información'}, disableClose: true});
    this.dialogSolicitud.afterClosed().subscribe((result) => {
      if (result !== null && result !== "") {
        this._snackBar.open(result, 'Ok', {
          duration: 2000,
        });
        this.filtrar();
      }
    });
  }

  // solicitudAceptada(solicitud.id) {
  //   consume un endpoint
  // }

  // solicitudNegada(solicitud.id) {
  //   consume un endpoint
  // }

  borrar() {
    // this.filtro.email="";
    // this.filtro.username="";
    // this.filtro.fechaDesde = null;
    // this.filtro.fechaHasta = null;
    this.filtrar();
  }

  filtrar() {
    // this.usuarioService.obtener(this.filtro)
    // .subscribe((usuarios: Usuario[]) => {
    //   this.data = usuarios;
    // })
  }

}
