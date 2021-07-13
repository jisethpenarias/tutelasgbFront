import { Cliente } from "./cliente";
import { Tutela } from "./tutela";

export interface TutelaDashboard {
  cliente: Cliente;
  tutela: Tutela;
  fechaRegistro: Date;
  investigador: string;
  radicador: string;
}
