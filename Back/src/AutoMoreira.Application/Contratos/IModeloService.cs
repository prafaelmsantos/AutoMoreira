using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Domain;
using AutoMoreira.Application.Dtos;

namespace AutoMoreira.Application.Contratos
{
    public interface IModeloService
    {
        Task<ModeloDto> AddModelos(ModeloDto model);
        Task<ModeloDto> UpdateModelo(int modeloId, ModeloDto model);
        Task<bool> DeleteModelo(int modeloId);

        Task<ModeloDto[]> GetAllModelosAsync();
        Task<ModeloDto> GetModeloByIdAsync(int modeloId);
        Task<ModeloDto[]> GetModeloByMarcaAsync(string marcaNome);
        
    }
}