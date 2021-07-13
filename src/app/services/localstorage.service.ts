import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LoginExitoso} from '../models/loginExitoso';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  observable = new BehaviorSubject(this.usuarioLogueado);

  constructor() { }

  set usuarioLogueado(value: LoginExitoso) {
    this.observable.next(value);
    localStorage.setItem('usuarioLogueado', JSON.stringify(value));
  }

  get usuarioLogueado() {
    return localStorage.getItem('usuarioLogueado') === null ? null : JSON.parse(localStorage.getItem('usuarioLogueado'));
  }
}
