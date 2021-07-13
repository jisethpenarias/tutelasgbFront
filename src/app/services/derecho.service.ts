import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DerechoService {

  private REST_API_SERVER_DERECHOS = 'http://localhost:8080/derechos/';

  constructor(private httpClient: HttpClient) { }

  public obtener() {
    return this.httpClient.get(this.REST_API_SERVER_DERECHOS);
  }
}
