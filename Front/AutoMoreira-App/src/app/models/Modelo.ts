import { Marca } from "./Marca";

export interface Modelo {

  modeloId: number;
  modeloNome: string;
  marcaId: number;
  marca: Marca;
}
