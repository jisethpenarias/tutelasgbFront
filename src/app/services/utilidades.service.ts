import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {Anexo} from '../models/anexo';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor() { }

  public convertirEtapa(etapa: string) {
    return etapa === 'RADICADA' ? 'Radicada' :
      etapa === 'ASIGNADA' ? 'Asignada' :
        etapa === 'REVISION_RESPUESTA_CLIENTE' ?  'Revision respuesta' :
          etapa === 'RESPONDIDA' ? 'Respondida' :
            etapa === 'FALLO' ? 'Fallo' :
              etapa === 'REVISION_IMPUGNACION_CLIENTE' ? 'Revision impugnacion' :
                etapa === 'IMPUGNACION' ? 'Impugnacion' :
                  etapa === 'ARCHIVADA_SIN_IMPUGNACION' ? 'Archivada sin impugnacion' :
                    etapa === 'ARCHIVADA_CON_IMPUGNACION' ? 'Archivada con impugnacion' : etapa;
  }

  public verificarTermino(termino: Date) {
    const numeroDiasDiferencia = moment(termino).diff(new Date(), 'days');
    if (numeroDiasDiferencia <= 4) {
      return true;
    }
    return false;
  }


}
