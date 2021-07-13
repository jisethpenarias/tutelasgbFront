import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private REST_API_SERVER_LOGIN = 'http://localhost:8080/login/';

  constructor(private httpClient: HttpClient) { }

  public login(login: Login) {
    return this.httpClient.post(this.REST_API_SERVER_LOGIN, login);
  }
}
