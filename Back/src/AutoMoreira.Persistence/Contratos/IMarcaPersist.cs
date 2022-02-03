using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Domain;

namespace AutoMoreira.Persistence.Contratos
{
    public interface IMarcaPersist
    {
        Task<Marca[]> GetAllMarcasAsync();
        Task<Marca> GetMarcaByIdAsync(int marcaId);
        
    }
}