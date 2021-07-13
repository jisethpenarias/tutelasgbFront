import { Promedio } from "./promedio";
import { TutelaDashboard } from "./tutelaDashboard";

export interface Dashboard {
  numeroTutelas: number;
  numeroTutelasSinImpugnacion: number;
  numeroTutelasConImpugnacion: number;
  promedios: Promedio[];
  tutelasArchivadas: TutelaDashboard[];
}
