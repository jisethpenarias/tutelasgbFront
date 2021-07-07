import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TutelaService} from '../../services/tutela.service';

@Component({
  selector: 'app-dialog-fallo',
  templateUrl: './dialog-fallo.component.html',
  styleUrls: ['./dialog-fallo.component.css']
})
export class DialogFalloComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: number,
              private tutelaService: TutelaService,
              public dialogRef: MatDialogRef<DialogFalloComponent>) { }

  ngOnInit(): void {
  }

  noImpugar() {
    this.tutelaService.archivar(this.data).subscribe(
      (response) => {
        this.dialogRef.close('Archivado');
      },
      (error) => {
        this.dialogRef.close(error);
      }
    );
  }

}
