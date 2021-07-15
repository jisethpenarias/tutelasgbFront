import {Component, Input, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {LocalstorageService} from '../services/localstorage.service';
import {Router} from '@angular/router';
import {Solicitud} from '../models/solicitud';
import {SolicitudService} from '../services/solicitud.service';
import {SpinnerComponent} from '../spinner/spinner.component';
import {MatDialog} from '@angular/material/dialog';
import {TutelaService} from '../services/tutela.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PerfilComponent} from '../perfil/perfil.component';

@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent implements OnInit {

  mostrarBarraLateral: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  solicitudes: Solicitud[] = [];

  dialogPerfil;

  constructor(private breakpointObserver: BreakpointObserver,
              private localstorageService: LocalstorageService,
              private solicitudService: SolicitudService,
              private _snackbar: MatSnackBar,
              private tutelaService: TutelaService,
              private router: Router,
              private dialog: MatDialog) {

    localstorageService.observable.subscribe((nextValue) => {
      if (nextValue !== null) {
        this.mostrarBarraLateral = true;
      }
      if (nextValue === null) {
        this.mostrarBarraLateral = false;
      }
    });
  }

  ngOnInit(): void {
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    this.solicitudService.obtener({idTutela: null, fechaDesde: null, fechaHasta: null, estado: 'CREADA'}).subscribe(
      (solicitudesResponse: Solicitud[]) => {
        spinnerRef.close();
        this.solicitudes = solicitudesResponse.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()).slice(0, 5);
      }, () => {spinnerRef.close()});
  }

  cerrarSesion() {
    this.localstorageService.usuarioLogueado = null;
    this.router.navigate(['']);
  }

  ejecutarAsignaciones() {
    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    this.tutelaService.asignarTutelas().subscribe(() => {
      spinnerRef.close();
      this._snackbar.open('Se ha ejecutado el proceso de asignacion satisfactoriamente.', 'Ok');
    }, () => {
      spinnerRef.close();
      this._snackbar.open('El proceso no ha podido ser ejecutado, por favor intente mas tarde', 'Ok');
    });
  }

  mostrarPerfil() {
    this.router.navigate(['perfil']);
  }
}
