import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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

  tiposAnexos = tiposAnexos;
  displayedColumnsAnexos: string[] = ['nombre', 'tipo', 'acciones'];
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


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private clienteService: ClienteService,
              private derechoService: DerechoService,
              private tutelaService: TutelaService,
              private anexoService: AnexoService,
              public dialogRef: MatDialogRef<DialogRadicarTutelaComponent>,
              private _snackBar: MatSnackBar) {
    this.fileControl = new FormControl(this.files, [
      MaxSizeValidator(this.maxSize * 1024)
    ]);
  }

  ngOnInit(): void {
    if (this.data.tutela != null) {
      this.tutela = this.data.tutela;
      this.derechosSeleccionados = this.tutela.derechos.map(derecho => derecho.id);
    }

    this.clienteOpciones = [];
    this.clienteService.obtener(this.clienteFiltro).subscribe(
      (clientes: Cliente[]) => {
        clientes.forEach(cliente => {
          // this.clienteOpciones.push({viewValue: cliente.nombre, value: cliente.id});
          this.clienteOpciones.push(cliente);
        });
       }
    );

    this.derechosOpciones = [];
    this.derechoService.obtener().subscribe((derechos: Derecho[]) => {
      this.derechosOpciones = derechos;
    });

    this.fileControl.valueChanges.subscribe((files: any) => {
        this.files = files;
        this.tutela.anexos.push({id: null, nombre: files.name, descripcion: '', tipo: this.tipoAnexo, url: '', fechaSubida: null,
            usuarioSubida: null, ultimaDescarga: null, file: files});

        if ( this.data.tutela !== null ) {
          this.anexoService.anexarArchivoATutela(files, this.data.tutela.id, this.tipoAnexo).subscribe((response: Anexo) => {
            this.tutela.anexos = this.tutela.anexos.map(anexo => {
                if (anexo.nombre === response.nombre) {
                  anexo = response;
                }
                return anexo;
              });
            },
            (error) => {
              console.log(error);
              this._snackBar.open('Ocurrio un error en la subida del archivo', 'Ok', {
                duration: 2000,
              });
            }
          );
        }

        this.tablaAnexos.renderRows();
        this.uploader.writeValue(null);
        this.tipoAnexo = '';
        this.files = undefined;
    });
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

  eliminarAnexo(anexoAEliminar: Anexo) {
    if (this.data.tutela !== null) {
      this.anexoService.eliminarAnexo(anexoAEliminar.nombre, anexoAEliminar.id).subscribe((response) => {});
    }
    this.tutela.anexos = this.tutela.anexos.filter(anexo => anexo.nombre !== anexoAEliminar.nombre);
    this.tablaAnexos.renderRows();
  }

  descargarAnexo(anexoADescargar: Anexo) {
    if (anexoADescargar.url !== '') {
      window.open(anexoADescargar.url,'_blank');
    }
  }


  crearEditar() {
    if (this.tutela.derechos.length > 0 ) {
      this.tutela.derechos = this.derechosSeleccionados.map(tutelaId => { return {id: tutelaId, nombre: '', descripcion: ''} });
    }

    if ( this.data.titulo === 'Radicar' ) {
      this.tutelaService.crear(this.tutela).subscribe(
        (tutelaResponse: Tutela) => {
          if (this.data.tutela === null) {
            this.tutela.anexos.forEach(anexo => {
              this.anexoService.anexarArchivoATutela(anexo.file, tutelaResponse.id, anexo.tipo).subscribe((response) => {
                  this.dialogRef.close('Tutela Creada Satisfactoriamente!');
                },
                (error) => {
                  console.log(error);
                  this._snackBar.open('Ocurrio un error en la radicacion de la tutela', 'Ok', {
                    duration: 2000,
                  });
                }
              );
            });
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
          this.dialogRef.close('Tutela Editada Satisfactoriamente!');
        },
        (error) => {
          this._snackBar.open('Ocurrio un error en la edicion de la tutela', 'Ok', {
            duration: 2000,
          });
        }
      );
    }

  }

}
