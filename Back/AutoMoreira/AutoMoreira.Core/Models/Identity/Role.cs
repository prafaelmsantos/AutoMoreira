using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Core.Models.Identity
{
    public class Role : IdentityRole<int>
    {
        //Uma Role pode ter muitos Users
        public IEnumerable<UserRole> UserRoles { get; set; }
    }
}
