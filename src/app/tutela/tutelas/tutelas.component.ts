import { Component, OnInit } from '@angular/core';
import { etapas } from 'src/app/data/etapas';
import { FiltroCliente } from 'src/app/models/filtroCliente';
import { FiltroTutela } from 'src/app/models/filtroTutela';
import { SelectOpciones } from 'src/app/models/selectOpciones';
import { ClienteService } from 'src/app/services/cliente.service';

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

  constructor(private clienteService: ClienteService) { }

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
    )
  }

  openDialog() {
    
  }

  borrar() {

  }

  filtrar() {

  }
}
