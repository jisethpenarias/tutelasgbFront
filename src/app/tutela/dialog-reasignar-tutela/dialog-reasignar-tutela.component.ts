import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TutelaService} from '../../services/tutela.service';

@Component({
  selector: 'app-dialog-reasignar-tutela',
  templateUrl: './dialog-reasignar-tutela.component.html',
  styleUrls: ['./dialog-reasignar-tutela.component.css']
})
export class DialogReasignarTutelaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: number,
              private tutelaService: TutelaService,
              public dialogRef: MatDialogRef<DialogReasignarTutelaComponent>) { }

  ngOnInit(): void {
  }

  reasignar() {
    this.tutelaService.reasignarTutela(this.data).subscribe(
      (response) => {
        this.dialogRef.close('Reasignado');
      },
      (error) => {
        this.dialogRef.close(error);
      }
    );
  }
}
