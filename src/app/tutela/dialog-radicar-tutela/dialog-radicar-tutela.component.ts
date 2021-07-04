import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-radicar-tutela',
  templateUrl: './dialog-radicar-tutela.component.html',
  styleUrls: ['./dialog-radicar-tutela.component.css']
})
export class DialogRadicarTutelaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
