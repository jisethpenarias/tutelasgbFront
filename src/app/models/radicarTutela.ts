import {Derecho} from './derecho';
import {Cliente} from './cliente';
import {Anexo} from './anexo';

export interface RadicarTutela {
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
  cliente: Cliente;
  anexos: Anexo[];
}
