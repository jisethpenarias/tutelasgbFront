import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../models/dashboard';



const ELEMENT_DATA: Dashboard =
  { numeroTutelas: 6659,
    numeroTutelasSinImpugnacion: 3224,
    numeroTutelasConImpugnacion: 3425,
    promedios: [{numeroDias: 9, etapa: 'radicada'}],
    tutelasArchivadas: [{
      cliente: {id: null, nombre: 'Coomeva', direccion: '' ,  email: '', documento: '', tipoDocumento: '', fechaCreacion: null, activo: true},
      tutela: {id: 12, hechos: '', peticion: '', termino: null, etapa: '', cliente:null},
      fechaRegistro: new Date(),
      investigador: 'string',
      radicador: 'string'}]
  };

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['cliente', 'idTutela', 'fechaDeRegistro', 'investigador', 'radicador'];
  displayedColumns2: string[] = ['etapa', 'numeroDias'];
  data: Dashboard;

  constructor() {
    this.data = ELEMENT_DATA;
   }

  ngOnInit(): void {
  }

}
