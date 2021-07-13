import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { tiposDocumentos } from 'src/app/data/tiposDocumentos';
import { tiposAnexos } from 'src/app/data/tiposAnexos';

import { RadicarTutela } from 'src/app/models/radicarTutela';
import { ClienteService } from 'src/app/services/cliente.service';
import { FiltroCliente } from 'src/app/models/filtroCliente';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {tutela} from '../../data/tutela';
import {Derecho} from '../../models/derecho';
import {DerechoService} from '../../services/derecho.service';
import {Cliente} from '../../models/cliente';
import {Anexo} from '../../models/anexo';
import {ThemePalette} from '@angular/material/core';
import {MaxSizeValidator, NgxMatFileInputComponent} from '@angular-material-components/file-input';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {TutelaService} from '../../services/tutela.service';
import {AnexoService} from '../../services/anexo.service';
import {Tutela} from '../../models/tutela';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LocalstorageService} from '../../services/localstorage.service';
import {SelectOpciones} from '../../models/selectOpciones';
import {UtilidadesService} from '../../services/utilidades.service';
import {SpinnerComponent} from '../../spinner/spinner.component';

@Component({
  selector: 'app-dialog-radicar-tutela',
  templateUrl: './dialog-radicar-tutela.component.html',
  styleUrls: ['./dialog-radicar-tutela.component.css']
})
export class DialogRadicarTutelaComponent implements OnInit {

  tutela: RadicarTutela = {...tutela};
  tiposDocumentos = tiposDocumentos;
  derechosSeleccionados: number[] = [];

  @ViewChild('tablaAnexos') tablaAnexos: MatTable<Anexo>;
  @ViewChild('uploader') uploader: NgxMatFileInputComponent;

  tiposAnexosOpciones: SelectOpciones[] = [];
  displayedColumnsAnexos: string[] = ['nombre', 'tipo', 'acciones'];

  fechaMaxRadicacion;
  fechaMinRaciacion;

  // Variables para el uploader
  fileControl: FormControl;
  multiple: boolean = false;
  accept: string = '.pdf';
  maxSize: number = 5;
  color: ThemePalette = 'primary';
  public files;
  tipoAnexo: string = null;

  tutelaFormGroup = new FormGroup({
    fechaRadicacionJuzgadoValidacion: new FormControl('', [Validators.required]),
    numRadicadoJuzgadoValidacion: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    documentoAccionanteValidacion: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    tipoDocumentoAccionanteValidacion: new FormControl('',[Validators.required]),
    nombreAccionanteValidacion: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(100)])
  });

  derechosOpciones: Derecho[];
  clienteOpciones: Cliente[];
  clienteFiltro: FiltroCliente = {nombre: null, direccion: null, email: null, tipoDocumento: null, documento: null, fechaDesde: null, fechaHasta: null};

  respuestaInactiva: boolean;
  impugnacionInactiva: boolean;

  existeFallo: boolean;
  existeRespuesta: boolean;
  existeImpugnacion: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private clienteService: ClienteService,
              private derechoService: DerechoService,
              private tutelaService: TutelaService,
              private anexoService: AnexoService,
              public dialogRef: MatDialogRef<DialogRadicarTutelaComponent>,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              private utilidadesService: UtilidadesService) {
    this.fileControl = new FormControl(this.files, [
      MaxSizeValidator(this.maxSize * 1024)
    ]);
    this.fechaMinRaciacion = new Date();
    this.fechaMaxRadicacion = new Date();
    this.fechaMaxRadicacion.setDate(this.fechaMinRaciacion.getDate() + 14);
  }

  ngOnInit(): void {
    if (this.data.tutela != null) {
      this.tutela = this.data.tutela;

      this.respuestaInactiva = this.tutela.consenClientRespuesta;
      this.impugnacionInactiva = this.tutela.consenClientImpugna;

      this.existeFallo = this.tutela.anexos.some(anexo => anexo.tipo === 'FALLO');
      this.existeRespuesta = this.tutela.anexos.some(anexo => anexo.tipo === 'RESPUESTA');
      this.existeImpugnacion = this.tutela.anexos.some(anexo => anexo.tipo === 'IMPUGNACION');

      this.derechosSeleccionados = this.tutela.derechos.map(derecho => derecho.id);
    }

    this.tiposAnexosOpciones = tiposAnexos.filter(tutelaAnexo => {
      if (this.data.llamadoDesde === 'RADICADOR'){
        return tutelaAnexo.value === 'TUTELA' || tutelaAnexo.value === 'SOPORTE' || tutelaAnexo.value === 'FALLO';
      }
      if(this.data.llamadoDesde === 'ASIGNADAS') {
        return tutelaAnexo.value === 'RESPUESTA' || tutelaAnexo.value === 'IMPUGNACION';
      }
      return tutelaAnexo;
    });

    this.generarOpcionesClientes();
    this.generarOpcionesDerechos();

    this.fileControl.valueChanges.subscribe((files: any) => {
        this.files = files;

        if (files.size > (5 * 1024 * 1024)) {
          this._snackBar.open('No se permiten archivos de mas de 5Mb', 'Ok', {
            duration: 2000,
          });
          return;
        }

        this.tutela.anexos.push({id: null, nombre: files.name, descripcion: '', tipo: this.tipoAnexo, url: '', fechaSubida: null,
            usuarioSubida: null, ultimaDescarga: null, file: files});


        if ( this.data.tutela !== null ) {
          const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
          this.anexoService.anexarArchivoATutela(files, this.data.tutela.id, this.tipoAnexo).subscribe(
            (response: Anexo) => {
              this.tutela.anexos = this.tutela.anexos.map(anexo => {
                if (anexo.nombre === response.nombre) {
                  anexo = response;
                }
                return anexo;
              });
              spinnerRef.close();
            },
            (error) => {
              this.tutela.anexos = this.tutela.anexos.filter(anexo => anexo.nombre !== files.name);
              this._snackBar.open('Ocurrio un error en la subida del archivo', 'Ok', {
                duration: 2000,
              });
              spinnerRef.close();
            }
          );
        }

        this.tablaAnexos.renderRows();
        this.uploader.writeValue(null);
        this.tipoAnexo = '';
        this.files = undefined;
    });
  }

  eliminarAnexo(anexoAEliminar: Anexo) {
    if (this.data.tutela !== null) {
      const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
      this.anexoService.eliminarAnexo(anexoAEliminar.nombre, anexoAEliminar.id).subscribe((response) => {
        spinnerRef.close();
      }, () => {
        this._snackBar.open('Ocurrio un error eliminando el archivo, por favor intente nuevamente', 'Ok');
        spinnerRef.close();
      }
      );
    }
    this.tutela.anexos = this.tutela.anexos.filter(anexo => anexo.nombre !== anexoAEliminar.nombre);
    this.tablaAnexos.renderRows();
  }

  crearEditar() {
    if (!this.tutela.anexos.some(anexo => anexo.tipo === 'TUTELA')){
      this._snackBar.open('Debe añadir al menos un anexo de tipo tutela para radicar.');
      return;
    }

    if (this.derechosSeleccionados.length > 0 ) {
      this.tutela.derechos = this.derechosSeleccionados.map(derechoId => { return {id: derechoId, nombre: '', descripcion: ''} });
    }

    const spinnerRef = this.dialog.open(SpinnerComponent, {panelClass: 'transparent', disableClose: true});
    if ( this.data.titulo === 'Radicar' ) {
      this.tutelaService.crear(this.tutela).subscribe(
        (tutelaResponse: Tutela) => {
          if (this.data.tutela === null) {
            if (this.tutela.anexos.length > 0 ) {
              this.tutela.anexos.forEach(anexo => {
                this.anexoService.anexarArchivoATutela(anexo.file, tutelaResponse.id, anexo.tipo).subscribe((response) => {
                    this.dialogRef.close('Tutela Creada Satisfactoriamente!');
                    spinnerRef.close();
                  },
                  (error) => {
                    if (anexo.file.size > (5 * 1024 * 1024)) {
                      this._snackBar.open('El archivo: ' + anexo.file.name + ' pesa mas de 5Mb, y no sera subido', 'Ok', {
                        duration: 4000,
                      });
                    } else {
                      this._snackBar.open('Ocurrio un error en la radicacion de la tutela', 'Ok', {
                        duration: 3000,
                      });
                    }
                    spinnerRef.close();
                  }
                );
              });
            } else {
              spinnerRef.close();
              this.dialogRef.close('Tutela Creada Satisfactoriamente!');
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }

    if ( this.data.titulo === 'Editar') {
      this.tutelaService.editar(this.tutela).subscribe(
        () => {
          spinnerRef.close();
          this.dialogRef.close('Tutela Editada Satisfactoriamente!');
        },
        (error) => {
          spinnerRef.close();
          this._snackBar.open('Ocurrio un error en la edicion de la tutela', 'Ok', {
            duration: 2000,
          });
        }
      );
    }

  }


  getErrorMessage(propiedad: string, error: string) {
    if (error === 'required') {
      return 'Debe introducir la infomación requerida';
    }

    if (propiedad === 'nombreAccionante' && error === 'minmax') {
      return 'El nombre del accionante debe tener entre 4 y 100 caracteres';
    }

    if (propiedad === 'documentoAccionante' && error === 'minmax') {
      return 'El documento del accionante debe tener entre 4 y 20 caracteres';
    }

    if (propiedad === 'numRadicadoJuzgado' && error === 'minmax') {
      return 'El numero de radicado del juzgado debe tener entre 1 y 50 caracteres';
    }
  }

  descargarAnexo(anexoADescargar: Anexo) {
    if (anexoADescargar.url !== '') {
      window.open(anexoADescargar.url,'_blank');
    }
  }

  private generarOpcionesDerechos() {
    this.derechosOpciones = [];
    this.derechoService.obtener().subscribe((derechos: Derecho[]) => {
      this.derechosOpciones = derechos;
    });
  }

  private generarOpcionesClientes() {
    this.clienteOpciones = [];
    this.clienteService.obtener(this.clienteFiltro).subscribe(
      (clientes: Cliente[]) => {
        clientes.forEach(cliente => {
          this.clienteOpciones.push(cliente);
        });
      }
    );
  }

}
