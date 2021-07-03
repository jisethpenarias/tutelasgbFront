import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-dialog-desactivar-cliente',
  templateUrl: './dialog-desactivar-cliente.component.html',
  styleUrls: ['./dialog-desactivar-cliente.component.css']
})
export class DialogDesactivarClienteComponent implements OnInit {

  constructor(private clienteService: ClienteService,
              public dialogRef: MatDialogRef<DialogDesactivarClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
  }

  desactivar() {
    this.clienteService.desactivar(this.data).subscribe(
      (data) => {
        this.dialogRef.close('Cliente Desactivado Satisfactoriamente!');
      },
      (error) => {
        this.dialogRef.close(null);
      }
    )
  }

}
