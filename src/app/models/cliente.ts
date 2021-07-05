export interface Cliente {
  id: number;
  nombre: string;
  direccion: string;
  email: string;
  documento: string;
  tipoDocumento: string;
  fechaCreacion: Date;
  activo: boolean;
}
