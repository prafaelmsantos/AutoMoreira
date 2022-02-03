using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Domain;

namespace AutoMoreira.Application.Contratos
{
    public interface IMarcaService
    {
        Task<Marca> AddMarcas(Marca model);
        Task<Marca> UpdateMarca(int marcaId, Marca model);
        Task<bool> DeleteMarca(int marcaId);

        Task<Marca[]> GetAllMarcasAsync();
        Task<Marca> GetMarcaByIdAsync(int marcaId);
        
    }
}