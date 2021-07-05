import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FiltroTutela } from '../models/filtroTutela';
import {RadicarTutela} from '../models/radicarTutela';

@Injectable({
  providedIn: 'root'
})
export class TutelaService {

  private REST_API_SERVER_TUTELAS = 'http://localhost:8080/tutelas/';


  constructor(private httpClient: HttpClient) { }

  public obtener(tutelaFiltro: FiltroTutela) {
    return this.httpClient.post(this.REST_API_SERVER_TUTELAS + 'obtener', tutelaFiltro);
  }

  public obtenerTutela(idTutela: number) {
    return this.httpClient.get(this.REST_API_SERVER_TUTELAS + idTutela);
  }

  public crear(tutela: RadicarTutela){
    return this.httpClient.post(this.REST_API_SERVER_TUTELAS, tutela);
  }

  public editar(tutela: RadicarTutela) {
    return this.httpClient.put(this.REST_API_SERVER_TUTELAS, tutela);
  }

}
