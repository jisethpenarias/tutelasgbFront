import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {LocalstorageService} from './localstorage.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor(private localstorageService: LocalstorageService,
              private router: Router,
              private _snackbar: MatSnackBar) { }

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

  public controlAcceso() {
    if (this.localstorageService.usuarioLogueado === null) {
      this.router.navigate(['/login']);
      this._snackbar.open('Debe loguearse para acceder a esta pagina', 'Ok');
    }
  }
}
