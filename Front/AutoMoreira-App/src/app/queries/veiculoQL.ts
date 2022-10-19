import { gql } from "apollo-angular";


export class VeiculoQL {

  private GETVEICULOS = gql`
  query {
    veiculos {
      pageInfo {
        hasNextPage

      }
      nodes {
        veiculoId
        marcaId
        marca {
          marcaId
          marcaNome

        }
        modeloId
        modelo {
          modeloId
          modeloNome
          marcaId
        }
        versao
        combustivel
        preco
        ano
        cor
        numeroPortas
        transmissao
        cilindrada
        potencia
        observacoes
        imagemURL
        novidade
      }
    }
  }
`;
}
