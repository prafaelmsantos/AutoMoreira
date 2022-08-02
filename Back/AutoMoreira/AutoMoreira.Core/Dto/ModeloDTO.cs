using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Core.Dto
{
    public class ModeloDTO
    {
        public int ModeloId { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório!")]
        [Display(Name = "Nome do Modelo")]
        public string ModeloNome { get; set; }
        public int MarcaId { get; set; }
    }
}
