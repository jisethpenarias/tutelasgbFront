import {Derecho} from './derecho';

export interface Tutela {
  hechos: string;
  peticion: string;
  fundamentosMinisterio: string;
  peticionesMinisterio: string;
  termino: string;
  etapa: string;
  nombreAccionante: string;
  tipoDocumentoAccionante: string;
  documentoAccionante: string;
  direccionAccionante: string;
  telefonoAccionante: number;
  celularAccionante: number;
  numRadicadoJuzgado: string;
  fechaRadicacionJuzgado: Date;
  despacho: string;
  consenClientRespuesta: boolean;
  consenClientRespuestaComen: string;
  consenClientRespuestaFecha: Date;
  fechaEnvioRespuestaDespacho: Date;
  consenClientImpugna: boolean;
  consenClientImpugnaComen: string;
  consenClientImpugnaFecha: Date;
  fechaEnvioImpugnacionDespacho: Date;
  derechos: Derecho[];
}
