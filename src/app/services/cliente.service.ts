import {HttpClient, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteCreacionEdicion } from '../models/clienteCreacion';
import { FiltroCliente } from '../models/filtroCliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private REST_API_SERVER_CLIENTES = 'http://localhost:8080/clientes/';

  constructor(private httpClient: HttpClient) {}

  public obtener(clienteFiltro: FiltroCliente) {
    return this.httpClient.post(this.REST_API_SERVER_CLIENTES + 'obtener', clienteFiltro);
  }

  public subirPoder(files: any, nombreArchivo: string, idCliente: number) {
    const data: FormData = new FormData();
    data.set('poder', files[0], nombreArchivo);
    const newRequest = new HttpRequest('POST', this.REST_API_SERVER_CLIENTES + 'subirPoder/' + idCliente, data);
    return this.httpClient.request(newRequest);
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
