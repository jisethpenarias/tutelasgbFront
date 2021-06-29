import { Component, OnInit } from '@angular/core';

export interface TablaUsuarios {
  correo: string;
  usuario: string;
  fechaCreacion: Date;
}

const ELEMENT_DATA: TablaUsuarios[] = [
  {usuario: "Jiseth", correo: 'Hydrogen', fechaCreacion: new Date()},
  {usuario: "Jose", correo: 'Helium', fechaCreacion: new Date()},
  {usuario: "Conchita", correo: 'Lithium', fechaCreacion: new Date()},
];

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'correo', 'fechaCreacion'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: TablaUsuarios[] = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
