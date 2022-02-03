using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Domain;

namespace AutoMoreira.Persistence.Contratos
{
    public interface IModeloPersist
    {
        Task<Modelo[]> GetAllModelosAsync();
        Task<Modelo> GetModeloByIdAsync(int modeloId);
        Task<Modelo[]> GetModeloByMarcaIdAsync(int marcaId);
        
    }
}