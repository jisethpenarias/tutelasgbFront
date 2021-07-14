import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FiltroTutela } from '../models/filtroTutela';
import {RadicarTutela} from '../models/radicarTutela';
import {Observable} from 'rxjs';
import {LocalstorageService} from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class TutelaService {

  private REST_API_SERVER_TUTELAS = 'http://localhost:8080/tutelas/';


  constructor(private httpClient: HttpClient,
              private localStorageService: LocalstorageService) { }

  public obtener(tutelaFiltro: FiltroTutela) {
    return this.httpClient.post(this.REST_API_SERVER_TUTELAS + 'obtener', tutelaFiltro);
  }

  public obtenerTutela(idTutela: number) {
    return this.httpClient.get(this.REST_API_SERVER_TUTELAS + idTutela);
  }

  public crear(tutela: RadicarTutela){
    return this.httpClient.post(this.REST_API_SERVER_TUTELAS + this.localStorageService.usuarioLogueado.id, tutela);
  }

  public editar(tutela: RadicarTutela) {
    return this.httpClient.put(this.REST_API_SERVER_TUTELAS, tutela);
  }

  public asignarTutelas() {
    return this.httpClient.get(this.REST_API_SERVER_TUTELAS + 'asignarTutelas/');
  }

  public reasignarTutela(idTutela: number) {
    return this.httpClient.get(this.REST_API_SERVER_TUTELAS + 'reasignarTutela/' + idTutela );
  }

  public archivar(idTutela: number) {
    return this.httpClient.put(this.REST_API_SERVER_TUTELAS + 'archivar/' + idTutela, null);
  }

}
