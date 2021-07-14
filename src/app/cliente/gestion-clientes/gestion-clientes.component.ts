import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tiposDocumentos } from 'src/app/data/tiposDocumentos';
import { Cliente } from 'src/app/models/cliente';
import { FiltroCliente } from 'src/app/models/filtroCliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { DialogCrearClienteComponent } from '../dialog-crear-cliente/dialog-crear-cliente.component';
import { DialogDesactivarClienteComponent } from '../dialog-desactivar-cliente/dialog-desactivar-cliente.component';
import {SpinnerComponent} from '../../spinner/spinner.component';
import {UtilidadesService} from '../../services/utilidades.service';


@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.component.html',
  styleUrls: ['./gestion-clientes.component.css']
})
export class GestionClientesComponent implements OnInit {

  tiposDocumentos = tiposDocumentos;
  displayedColumns: string[] = ['nombre', 'email', 'tipoDocumento', 'documento', 'fechaCreacion', 'direccion', 'acciones'];
  data: Cliente[];
  filtro: FiltroCliente = {nombre: "", email: "", tipoDocumento: "",  documento:"", direccion: "", fechaDesde: null, fechaHasta: null};
  dialogCreacion;
  dialogDesactivarCliente;


  constructor(private clienteService:ClienteService,
                      public dialog: MatDialog,
                      private utilidadesService: UtilidadesService,
                      private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.utilidadesService.controlAcceso();
    this.filtrar();
  }

  openDialog() {
    this.dialogCreacion = this.dialog.open(DialogCrearClienteComponent, {data: {cliente: null, titulo: 'Crear', boton: 'Crear'}});
    this.dialogCreacion.afterClosed().subscribe((result) => {
      if (result !== null && result !== "") {
        this._snackBar.open(result, 'Ok', {
          duration: 2000,
        });
        this.filtrar();
      }
    });
  }

  openDialogDesactivar(idCliente: number) {
    this.dialogDesactivarCliente = this.dialog.open(DialogDesactivarClienteComponent, {data: idCliente});
    this.dialogDesactivarCliente.afterClosed().subscribe((result) => {
      if (result !== null && result !== "") {
        this._snackBar.open(result, 'Ok', {
          duration: 2000,
        });
        this.filtrar();
      }
    });
  }

  editar(idCliente: number) {
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    this.clienteService.obtenerCliente(idCliente).subscribe(
      (cliente: any) => {
        this.dialogCreacion = this.dialog.open(DialogCrearClienteComponent, {data: {cliente: cliente, titulo: 'Editar', boton: 'Editar'}} );
        this.dialogCreacion.afterClosed().subscribe((result) => {
          if (result !== null && result !== "") {
            this._snackBar.open(result, 'Ok', {
              duration: 2000,
            });
            this.filtrar();
          }
        });
        spinnerRef.close();
      },
      (error) => {
        this._snackBar.open('La informacion del cliente no ha podido ser consultada, por favor intente mas tarde', 'ok');
      }
    );
  }

  borrar() {
    this.filtro.email = '';
    this.filtro.nombre = '';
    this.filtro.documento = '';
    this.filtro.tipoDocumento = '';
    this.filtro.direccion = '';
    this.filtro.fechaDesde = null;
    this.filtro.fechaHasta = null;
    this.filtrar();
  }

  filtrar() {
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    this.clienteService.obtener(this.filtro)
    .subscribe((clientes: Cliente[]) => {
      this.data = clientes;
      spinnerRef.close();
    }, (error) => {
      spinnerRef.close();
    });
  }
}
