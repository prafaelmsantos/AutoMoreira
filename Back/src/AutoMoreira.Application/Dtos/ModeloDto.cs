using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Application.Dtos;

namespace AutoMoreira.Application.Dtos
{
    public class ModeloDto
    {
        public int ModeloId {get; set;}

        [Required(ErrorMessage ="O campo {0} é obrigatório!")]
        [Display(Name="Nome do Modelo")]
        public string ModeloNome {get; set;}
        public int MarcaId {get; set;}
        public MarcaDto Marca {get; set;} 
        
    }
}