import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../services/usuario.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-desactivar-usuario',
  templateUrl: './dialog-desactivar-usuario.component.html',
  styleUrls: ['./dialog-desactivar-usuario.component.css']
})
export class DialogDesactivarUsuarioComponent implements OnInit {

  constructor(private usuarioService:UsuarioService,
              public dialogRef: MatDialogRef<DialogDesactivarUsuarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number
              ) { }

  ngOnInit(): void {
  }

  desactivar() {
    this.usuarioService.desactivar(this.data).subscribe(
      (data) => {
        this.dialogRef.close('Usuario Desactivado Satisfactoriamente!');
      },
      (error) => {
        this.dialogRef.close(null);
      }
    )
  }
}
