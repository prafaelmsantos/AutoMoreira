using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoMoreira.Domain
{
    public class Veiculo
    {
        public int VeiculoId {get; set;}
        public int MarcaId {get; set;}
        public Marca Marca {get; set;} 
        public int ModeloId {get; set;}
        public Modelo Modelo {get; set;}
        public string Versao {get; set;} 
        public string Combustivel {get; set;}
        public double Preco {get; set;}
        public int Ano {get; set;}
        public string Cor {get; set;}
        public string Observacoes {get; set;}
        public string ImagemURL { get; set; }
        
    }
}