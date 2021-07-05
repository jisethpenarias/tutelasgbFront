import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tiposDocumentos } from 'src/app/data/tiposDocumentos';
import { Cliente } from 'src/app/models/cliente';
import { FiltroCliente } from 'src/app/models/filtroCliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { DialogCrearClienteComponent } from '../dialog-crear-cliente/dialog-crear-cliente.component';
import { DialogDesactivarClienteComponent } from '../dialog-desactivar-cliente/dialog-desactivar-cliente.component';


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
                      private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
      })
  }

  borrar() {
    this.filtro.email="";
    this.filtro.nombre="";
    this.filtro.documento="";
    this.filtro.tipoDocumento="";
    this.filtro.direccion="";
    this.filtro.fechaDesde = null;
    this.filtro.fechaHasta = null;
    this.filtrar();
  }

  filtrar() {
    this.clienteService.obtener(this.filtro)
    .subscribe((clientes: Cliente[]) => {
      this.data = clientes;
    })
  }
}
