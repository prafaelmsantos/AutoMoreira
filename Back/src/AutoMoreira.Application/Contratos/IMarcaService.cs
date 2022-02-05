using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Domain;
using AutoMoreira.Application.Dtos;

namespace AutoMoreira.Application.Contratos
{
    public interface IMarcaService
    {
        Task<MarcaDto> AddMarcas(MarcaDto model);
        Task<MarcaDto> UpdateMarca(int marcaId, MarcaDto model);
        Task<bool> DeleteMarca(int marcaId);

        Task<MarcaDto[]> GetAllMarcasAsync();
        Task<MarcaDto> GetMarcaByIdAsync(int marcaId);
        
    }
}