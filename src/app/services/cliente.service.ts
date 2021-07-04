import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteCreacionEdicion } from '../models/clienteCreacion';
import { FiltroCliente } from '../models/filtroCliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  //private REST_API_SERVER_CLIENTES = 'http://localhost:8080/clientes/'
  private REST_API_SERVER_CLIENTES = 'http://5be74392e275.ngrok.io/clientes/'

  constructor(private httpClient: HttpClient) {}

  public obtener(clienteFiltro: FiltroCliente) {
    return this.httpClient.post(this.REST_API_SERVER_CLIENTES + 'obtener', clienteFiltro)
  }

  public obtenerCliente(idCliente: number) {
    return this.httpClient.get(this.REST_API_SERVER_CLIENTES + idCliente);
  }

  public crear(cliente: ClienteCreacionEdicion) {
    return this.httpClient.post(this.REST_API_SERVER_CLIENTES, cliente);
  }

  public editar(cliente: ClienteCreacionEdicion) {
    return this.httpClient.put(this.REST_API_SERVER_CLIENTES, cliente);
  }

  public desactivar(idCliente: number) {
    return this.httpClient.put(this.REST_API_SERVER_CLIENTES + idCliente, null);
  }
}
