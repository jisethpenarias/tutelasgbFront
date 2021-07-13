import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';
import {SpinnerComponent} from '../../spinner/spinner.component';

@Component({
  selector: 'app-dialog-desactivar-cliente',
  templateUrl: './dialog-desactivar-cliente.component.html',
  styleUrls: ['./dialog-desactivar-cliente.component.css']
})
export class DialogDesactivarClienteComponent implements OnInit {

  constructor(private clienteService: ClienteService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<DialogDesactivarClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
  }

  desactivar() {
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    this.clienteService.desactivar(this.data).subscribe(
      (data) => {
        spinnerRef.close();
        this.dialogRef.close('Cliente Desactivado Satisfactoriamente!');
      },
      (error) => {
        spinnerRef.close();
        this.dialogRef.close(null);
      }
    );
  }

}
