using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Domain;

namespace AutoMoreira.Application.Contratos
{
    public interface IVeiculoService
    {
        Task<Veiculo> AddVeiculos(Veiculo model);
        Task<Veiculo> UpdateVeiculo(int veiculoId, Veiculo model);
        Task<bool> DeleteVeiculo(int veiculoId);

        Task<Veiculo[]> GetAllVeiculosAsync();
        Task<Veiculo> GetVeiculoByIdAsync(int veiculoId);
        
    }
}