import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Solicitud} from '../../models/solicitud';
import {SolicitudService} from '../../services/solicitud.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-crear-solicitud-informacion',
  templateUrl: './dialog-crear-solicitud-informacion.component.html',
  styleUrls: ['./dialog-crear-solicitud-informacion.component.css']
})
export class DialogCrearSolicitudInformacionComponent implements OnInit {

  solicitudFormGroup = new FormGroup({
    tituloValidacion: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
    descripcionValidacion: new FormControl('',[Validators.maxLength(500)])
  });

  solicitud: Solicitud = {titulo: '', descripcion: '', estado: null, id: null, fechaCreacion: null, tutela: {}};

  constructor(private solicitudService: SolicitudService,
              public dialogRef: MatDialogRef<DialogCrearSolicitudInformacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.solicitud !== null) {
      this.solicitud = this.data.solicitud;
    }
  }

  submit() {
    this.solicitud.tutela.id = this.data;
    this.solicitudService.crear(this.solicitud).subscribe(
      (solicitudCreada) => {
        this.dialogRef.close('Creada');
      },
      (error) => {
        this.dialogRef.close(error);
      });
  }

  getErrorMessage(propiedad: string, error: string) {
    if (error === 'required') {
      return 'Debe introducir la infomación requerida';
    }

    if (propiedad === 'titulo' && error === 'minmax') {
      return 'El título de la solicitud debe estar entre 4 y 45 caracteres';
    }

    if (propiedad === 'descripcion' && error === 'minmax') {
      return 'La descripción de la solicitud no debe superar los 500 caracteres';
    }

    return '';
  }

}
