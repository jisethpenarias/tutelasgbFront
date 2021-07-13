import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../models/dashboard';
import {DashboardService} from '../services/dashboard.service';
import {UtilidadesService} from '../services/utilidades.service';
import {SpinnerComponent} from '../spinner/spinner.component';
import {MatDialog} from '@angular/material/dialog';


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

  constructor( private dashboardService: DashboardService,
               private utilidadesService: UtilidadesService,
               public dialog: MatDialog) {
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
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    this.dashboardService.obtenerInformacion(this.filtroFechas).subscribe((dashboardResponse: Dashboard) => {
      this.data = dashboardResponse;
      this.data.promedios = this.data.promedios.map(promedio => {
          return {...promedio,
            etapa: this.utilidadesService.convertirEtapa(promedio.etapa)};
        });
      spinnerRef.close();
    }, (error) => {
      spinnerRef.close();
    });
  }

  borrar() {
    const fechaActual = new Date();
    this.filtroFechas.fechaInicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    this.filtroFechas.fechaFin = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);
    this.filtrar();
  }
}
