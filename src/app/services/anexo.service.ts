import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnexoService {

  private REST_API_SERVER_ANEXOS = 'http://localhost:8080/anexos/';

  constructor(private httpClient: HttpClient) { }

  public anexarArchivoATutela(anexo: any, idTutela: number, tipoAnexo: string) {
    const data: FormData = new FormData();
    data.set('anexo', anexo, anexo.name);
    data.set('nombreArchivo', anexo.name);
    data.set('tipoAnexo', tipoAnexo);
    return this.httpClient.post(this.REST_API_SERVER_ANEXOS + idTutela, data);
  }

  public eliminarAnexo(nombreAnexo: string, idAnexo: number) {
    return this.httpClient.delete(this.REST_API_SERVER_ANEXOS + nombreAnexo + '/' + idAnexo);
  }
}
