using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoMoreira.Domain
{
    public class Modelo
    {
        public int ModeloId {get; set;}
        public string ModeloNome {get; set;}
        public int MarcaId {get; set;}
        public Marca Marca {get; set;} 
    
        
    }
}