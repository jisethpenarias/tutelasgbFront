import { Component, OnInit } from '@angular/core';

export interface RolUsuario {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-dialog-crear-usuario',
  templateUrl: './dialog-crear-usuario.component.html',
  styleUrls: ['./dialog-crear-usuario.component.css']
})
export class DialogCrearUsuarioComponent {

  rolesUsuario: RolUsuario[] = [
    {value: "RADICADOR", viewValue: "Radicador"},
    {value: "INVESTIGADOR", viewValue: "Investigador"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
