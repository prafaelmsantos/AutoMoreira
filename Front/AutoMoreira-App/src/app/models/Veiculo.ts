import { Marca } from "./Marca";
import { Modelo } from "./Modelo";

export interface Veiculo {

  veiculoId: number;
  marcaId: number;
  marca: Marca;
  modeloId: number;
  modelo: Modelo;
  ano: number;
  cor:string;
  observacoes:string;
  imagemURL:string;
  preco: DoubleRange;
  combustivel:string;
  versao: string;

}
