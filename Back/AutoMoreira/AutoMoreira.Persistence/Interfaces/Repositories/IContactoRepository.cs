using AutoMoreira.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Interfaces.Repositories
{
    public interface IContactoRepository
    {
        Task<Contacto[]> GetAllContactosAsync();
        Task<Contacto> GetContactoByIdAsync(int contactoId);
    }
}
