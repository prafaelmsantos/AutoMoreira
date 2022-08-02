using AutoMoreira.Core.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Interfaces.Services
{
    public interface IModeloService
    {
        Task<ModeloDTO> AddModelos(ModeloDTO model);
        Task<ModeloDTO> UpdateModelo(int modeloId, ModeloDTO model);
        Task<bool> DeleteModelo(int modeloId);

        Task<ModeloDTO[]> GetAllModelosAsync();
        Task<ModeloDTO> GetModeloByIdAsync(int modeloId);
        Task<ModeloDTO[]> GetModeloByMarcaAsync(string marcaNome);
    }
}
