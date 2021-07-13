import { SelectOpciones } from '../models/selectOpciones';

export const etapas: SelectOpciones[] = [
  {value: null, viewValue: 'selecciona una etapa'},
  {value: 'RADICADA', viewValue: 'Radicada'},
  {value: 'ASIGNADA', viewValue: 'Asignada'},
  {value: 'REVISION_RESPUESTA_CLIENTE', viewValue: 'Revisión Respuesta cliente'},
  {value: 'RESPONDIDA', viewValue: 'Respondida'},
  {value: 'FALLO', viewValue: 'Fallo'},
  {value: 'REVISION_IMPUGNACION_CLIENTE', viewValue: 'Revisión impugnación cliente'},
  {value: 'IMPUGNACION', viewValue: 'impugnación'},
  {value: 'ARCHIVADA_SIN_IMPUGNACION', viewValue: 'Archivada sin impugnación'},
  {value: 'ARCHIVADA_CON_IMPUGNACION', viewValue: 'Archivada con impugnación'}
];
