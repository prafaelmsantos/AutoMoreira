using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Core.Domains
{
    public class Veiculo
    {
        public int VeiculoId { get; set; }
        public int MarcaId { get; set; }
        public Marca Marca { get; set; }
        public int ModeloId { get; set; }
        public Modelo Modelo { get; set; }
        public string Versao { get; set; }
        public string Combustivel { get; set; }
        public double Preco { get; set; }
        public int Ano { get; set; }
        public string Cor { get; set; }
        public int NumeroPortas { get; set; }
        public string Transmissao { get; set; }
        public int Cilindrada { get; set; }
        public int Potencia { get; set; }
        public string Observacoes { get; set; }
        public string ImagemURL { get; set; }
        public bool Novidade { get; set; }
    }
}
