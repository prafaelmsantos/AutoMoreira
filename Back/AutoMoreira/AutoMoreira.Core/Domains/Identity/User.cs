using AutoMoreira.Core.Domains.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Core.Domains.Identity
{
    public class User : IdentityUser<int>
    {
        public string PrimeiroNome { get; set; }
        public string UltimoNome { get; set; }
        public FUNCAO Funcao { get; set; }
        public string Descricao { get; set; }
        public string ImagemUrl { get; set; }

        //Um User pode ter muitas Roles
        public IEnumerable<UserRole> UserRoles { get; set; }
    }
}
