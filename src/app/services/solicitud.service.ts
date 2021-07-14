import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Solicitud} from '../models/solicitud';
import {LocalstorageService} from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private REST_API_SERVER_SOLICITUDES = 'http://localhost:8080/solicitudes/';

  constructor(private httpClient: HttpClient,
              private localStorageService: LocalstorageService) { }

  public crear(solicitud: Solicitud) {
    return this.httpClient.post(this.REST_API_SERVER_SOLICITUDES + this.localStorageService.usuarioLogueado.username, solicitud);
  }

  public obtener(filtroSolicitudes: any) {
    return this.httpClient.post(this.REST_API_SERVER_SOLICITUDES + 'obtener', filtroSolicitudes);
  }

  public actualizarSolicitud(solicitud: Solicitud) {
    return this.httpClient.put(this.REST_API_SERVER_SOLICITUDES + this.localStorageService.usuarioLogueado.username, solicitud);
  }
}
