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

@Component({
  selector: 'app-tutelas',
  templateUrl: './tutelas.component.html',
  styleUrls: ['./tutelas.component.css']
})
export class TutelasComponent implements OnInit {

  filtroTutela: FiltroTutela = {idCliente: null, idTutela: null, etapa: "", fechaDesde: null, fechaHasta: null};
  clienteFiltro: FiltroCliente = {nombre: null,direccion: null,email: null,tipoDocumento: null,documento: null,fechaDesde: null,fechaHasta: null};
  etapaOpciones: SelectOpciones[];
  clienteOpciones: SelectOpciones[];
  data: Tutela[];

  displayedColumns: string[] = ['id', 'hechos', 'peticion', 'etapa', 'cliente', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dialogRadicacion;


  constructor(private clienteService: ClienteService,
              private tutelaService: TutelaService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.etapaOpciones = etapas;
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
    this.filtrar();
  }

  openDialog() {
    this.dialogRadicacion = this.dialog.open(DialogRadicarTutelaComponent, {data: {tutela: null, titulo: 'Radicar', boton: 'Radicar tutela'}});
    this.dialogRadicacion.afterClosed().subscribe((result) => {
      if (result !== null && result !== "") {
        this._snackBar.open(result, 'Ok', {
          duration: 2000,
        });
        this.filtrar();
      }
    });
  }

  borrar() {
    this.filtroTutela.idCliente=null;
    this.filtroTutela.idTutela=null;
    this.filtroTutela.etapa="";
    this.filtroTutela.fechaDesde = null;
    this.filtroTutela.fechaHasta = null;
    this.filtrar();
  }

  filtrar() {
    this.tutelaService.obtener(this.filtroTutela)
    .subscribe((clientes: Tutela[]) => {
      this.data = clientes;
    })
  }
}
