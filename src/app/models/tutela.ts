export interface Tutela {
  id: number;
  hechos: string;
  peticion: string;
  termino: Date;
  pintarRojoFila?: boolean;
  etapa: string;
  cliente: any;
}
