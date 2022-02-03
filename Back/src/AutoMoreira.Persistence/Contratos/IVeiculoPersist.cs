using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Domain;

namespace AutoMoreira.Persistence.Contratos
{
    public interface IVeiculoPersist
    {
        Task<Veiculo[]> GetAllVeiculosAsync();
        Task<Veiculo> GetVeiculoByIdAsync(int veiculoId);
    }
}