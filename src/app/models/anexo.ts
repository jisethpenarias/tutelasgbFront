export interface Anexo {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  url: string;
  fechaSubida: Date;
  usuarioSubida: string;
  ultimaDescarga: string;
  file: File;
}
