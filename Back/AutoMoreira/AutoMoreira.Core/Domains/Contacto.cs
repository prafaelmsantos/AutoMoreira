using System;

namespace AutoMoreira.Core.Domains
{
    public class Contacto
    {
        public int ContactoId { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Mensagem { get; set; }
        public DateTime DataHora { get; set; }

    }
}
