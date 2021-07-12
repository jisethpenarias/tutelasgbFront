import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../models/dashboard';
import {DashboardService} from '../services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['cliente', 'idTutela', 'fechaDeRegistro', 'investigador', 'radicador'];
  displayedColumns2: string[] = ['etapa', 'numeroDias'];
  data: Dashboard;

  filtroFechas: any = {
    fechaInicio: null,
    fechaFin: null
  };

  constructor( private dashboardService: DashboardService) {
    this.data = { numeroTutelas: 0,
        numeroTutelasSinImpugnacion: 0,
        numeroTutelasConImpugnacion: 0,
        promedios: [],
        tutelasArchivadas: []
    };
   }

  ngOnInit(): void {
    this.borrar();
  }

  filtrar() {
    this.dashboardService.obtenerInformacion(this.filtroFechas).subscribe((dashboardResponse: Dashboard) => {
      this.data = dashboardResponse;
      this.data.promedios = this.data.promedios.map(promedio => {
          return {...promedio,
            etapa: promedio.etapa === 'RADICADA' ? 'Radicada' :
              promedio.etapa === 'ASIGNADA' ? 'Asignada' :
                promedio.etapa === 'REVISION_RESPUESTA_CLIENTE' ?  'Revision respuesta' :
                  promedio.etapa === 'RESPONDIDA' ? 'Respondida' :
                    promedio.etapa === 'FALLO' ? 'Fallo' :
                      promedio.etapa === 'REVISION_IMPUGNACION_CLIENTE' ? 'Revision impugnacion' :
                        promedio.etapa === 'IMPUGNACION' ? 'Impugnacion' :
                          promedio.etapa === 'ARCHIVADA_SIN_IMPUGNACION' ? 'Archivada sin impugnacion' :
                            promedio.etapa === 'ARCHIVADA_CON_IMPUGNACION' ? 'Archivada con impugnacion' : promedio.etapa};
        });
    });
  }

  borrar() {
    const fechaActual = new Date();
    this.filtroFechas.fechaInicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    this.filtroFechas.fechaFin = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);
    this.filtrar();
  }
}
