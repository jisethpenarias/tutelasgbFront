import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { UsuarioService } from '../../services/usuario.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SpinnerComponent} from '../../spinner/spinner.component';

@Component({
  selector: 'app-dialog-desactivar-usuario',
  templateUrl: './dialog-desactivar-usuario.component.html',
  styleUrls: ['./dialog-desactivar-usuario.component.css']
})
export class DialogDesactivarUsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<DialogDesactivarUsuarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number
              ) { }

  ngOnInit(): void {
  }

  desactivar() {
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    this.usuarioService.desactivar(this.data).subscribe(
      (data) => {
        spinnerRef.close();
        this.dialogRef.close('Usuario Desactivado Satisfactoriamente!');
      },
      (error) => {
        spinnerRef.close();
        this.dialogRef.close(null);
      }
    );
  }
}
