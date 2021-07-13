import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private REST_API_SERVER_DASHBOARD = 'http://localhost:8080/dashboard/';

  constructor(private httpClient: HttpClient) { }

  obtenerInformacion(filtroFechas: any) {
    return this.httpClient.post(this.REST_API_SERVER_DASHBOARD, filtroFechas);
  }
}
