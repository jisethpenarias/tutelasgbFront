import {Component, Input, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {LocalstorageService} from '../services/localstorage.service';
import {Router} from '@angular/router';
import {Solicitud} from '../models/solicitud';
import {SolicitudService} from '../services/solicitud.service';

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

  constructor(private breakpointObserver: BreakpointObserver,
              private localstorageService: LocalstorageService,
              private solicitudService: SolicitudService,
              private router: Router) {

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
    this.solicitudService.obtener({idTutela: null, fechaDesde: null, fechaHasta: null, estado: 'CREADA'}).subscribe(
      (solicitudesResponse: Solicitud[]) => {
        this.solicitudes = solicitudesResponse.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()).slice(0, 5);
      });
  }

  cerrarSesion() {
    this.localstorageService.usuarioLogueado = null;
    this.router.navigate(['/login']);
  }

}
