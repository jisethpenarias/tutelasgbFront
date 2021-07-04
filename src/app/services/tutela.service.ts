import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FiltroTutela } from '../models/filtroTutela';

@Injectable({
  providedIn: 'root'
})
export class TutelaService {

  //private REST_API_SERVER_CLIENTES = 'http://localhost:8080/clientes/'
  private REST_API_SERVER_CLIENTES = 'http://6ef070d747e2.ngrok.io/tutelas/'

  constructor(private httpClient: HttpClient) { }

  public obtener(tutelaFiltro: FiltroTutela) {
    return this.httpClient.post(this.REST_API_SERVER_CLIENTES + 'obtener', tutelaFiltro)
  }

}
