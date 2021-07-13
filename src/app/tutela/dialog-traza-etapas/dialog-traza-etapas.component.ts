import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FiltroCliente } from 'src/app/models/filtroCliente';
import { SelectOpciones } from 'src/app/models/selectOpciones';
import { TrazaEtapa } from 'src/app/models/trazaEtapa';
import { TrazaEtapaService } from 'src/app/services/traza-etapa.service';
import { TutelasComponent } from '../tutelas/tutelas.component';
import {UtilidadesService} from '../../services/utilidades.service';

@Component({
  selector: 'app-dialog-traza-etapas',
  templateUrl: './dialog-traza-etapas.component.html',
  styleUrls: ['./dialog-traza-etapas.component.css']
})
export class DialogTrazaEtapasComponent implements OnInit {

  displayedColumns: string[] = ['etapaAnterior', 'etapaActual', 'fechaDeCambio'];

  trazaEtapas: TrazaEtapa[] = [];
  clienteOpciones: SelectOpciones[];


  constructor(@Inject(MAT_DIALOG_DATA) public data: number,
              private trazaEtapaService: TrazaEtapaService,
              private utilidadesService: UtilidadesService) { }

  ngOnInit(): void {
    this.trazaEtapaService.consultaTrazaEtapa(this.data).subscribe((trazaEtapasResponse: TrazaEtapa[]) => {
      this.trazaEtapas = trazaEtapasResponse;
      this.trazaEtapas = this.trazaEtapas.map(trazaEtapa => {
          return {...trazaEtapa,
            etapaActual: this.utilidadesService.convertirEtapa(trazaEtapa.etapaActual),
            etapaAnterior: this.utilidadesService.convertirEtapa(trazaEtapa.etapaAnterior)
          };
        });
    });
  }

}
