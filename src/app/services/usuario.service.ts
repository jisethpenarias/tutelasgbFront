import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FiltroUsuario } from '../models/filtroUsuario';
import { UsuarioCreacion } from '../models/usuarioCreacion';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //private REST_API_SERVER_USUARIOS = 'http://localhost:8080/usuarios/'
  private REST_API_SERVER_USUARIOS = 'http://b6e8248aa4c9.ngrok.io/usuarios/'


  constructor(private httpClient:HttpClient) { }

  public obtener(usuarioFiltro: FiltroUsuario) {
    return this.httpClient.post(this.REST_API_SERVER_USUARIOS + 'obtener', usuarioFiltro);
  }

  public obtenerUsuario(idUsuario: number) {
    return this.httpClient.get(this.REST_API_SERVER_USUARIOS + idUsuario);
  }

  public crear(usuario: UsuarioCreacion) {
    return this.httpClient.post(this.REST_API_SERVER_USUARIOS, usuario);
  }

  public editar(usuario: UsuarioCreacion) {
    return this.httpClient.put(this.REST_API_SERVER_USUARIOS, usuario);
  }

  public desactivar(idUsuario: number) {
    return this.httpClient.put(this.REST_API_SERVER_USUARIOS + idUsuario, null);
  }

}
