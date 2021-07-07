import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrazaEtapaService {

  private REST_API_SERVER_TRAZAS = 'http://localhost:8080/trazas/';

  constructor(private httpClient: HttpClient) { }

  public consultaTrazaEtapa(idTutela: number) {
    return this.httpClient.get(this.REST_API_SERVER_TRAZAS + idTutela);
  }

}
