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
  marcaNome: string;
  numeroPortas: number;
  transmissao: string;
  cilindrada: number;
  potencia: number;
  novidade: boolean;

}
