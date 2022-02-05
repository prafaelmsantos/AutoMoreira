using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Domain;
using AutoMoreira.Application.Dtos;

namespace AutoMoreira.Application.Contratos
{
    public interface IVeiculoService
    {
        
        Task<VeiculoDto> AddVeiculos(VeiculoDto model);
        Task<VeiculoDto> UpdateVeiculo(int veiculoId, VeiculoDto model);
        Task<bool> DeleteVeiculo(int veiculoId);

        Task<VeiculoDto[]> GetAllVeiculosAsync();
        Task<VeiculoDto> GetVeiculoByIdAsync(int veiculoId);
        
    }
}