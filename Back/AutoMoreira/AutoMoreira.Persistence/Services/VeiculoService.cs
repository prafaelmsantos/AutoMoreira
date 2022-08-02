using AutoMapper;
using AutoMoreira.Core.Dto;
using AutoMoreira.Core.Models;
using AutoMoreira.Persistence.Interfaces.Repositories;
using AutoMoreira.Persistence.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Services
{
    public class VeiculoService : IVeiculoService
    {
        private readonly IBaseRepository _baseRepository;
        private readonly IVeiculoRepository _veiculoRepository;
        private readonly IMapper _mapper;
        public VeiculoService(
        IBaseRepository baseRepository,
        IVeiculoRepository veiculoRepository,
        IMapper mapper)
        {
            _veiculoRepository = veiculoRepository;
            _baseRepository = baseRepository;
            _mapper = mapper;
        }
        public async Task<VeiculoDTO> AddVeiculos(VeiculoDTO model)
        {

            try
            {
                var veiculo = _mapper.Map<Veiculo>(model);
                _baseRepository.Add<Veiculo>(veiculo);

                if (await _baseRepository.SaveChangesAsync())
                {
                    var veiculoRetorno = await _veiculoRepository.GetVeiculoByIdAsync(veiculo.VeiculoId);
                    return _mapper.Map<VeiculoDTO>(veiculoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VeiculoDTO> UpdateVeiculo(int veiculoId, VeiculoDTO model)
        {
            try
            {
                var veiculo = await _veiculoRepository.GetVeiculoByIdAsync(veiculoId);
                if (veiculo == null) return null;

                model.VeiculoId = veiculo.VeiculoId;

                //O DTO vai ser mapeado para o meu evento
                _mapper.Map(model, veiculo);

                _baseRepository.Update<Veiculo>(veiculo);

                if (await _baseRepository.SaveChangesAsync())
                {
                    var veiculoRetorno = await _veiculoRepository.GetVeiculoByIdAsync(veiculo.VeiculoId);
                    return _mapper.Map<VeiculoDTO>(veiculoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteVeiculo(int veiculoId)
        {
            try
            {
                var veiculo = await _veiculoRepository.GetVeiculoByIdAsync(veiculoId);
                if (veiculo == null) throw new Exception("Veiculo para delete não encontrado.");

                _baseRepository.Delete<Veiculo>(veiculo);
                return await _baseRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VeiculoDTO[]> GetAllVeiculosAsync()
        {
            try
            {
                var veiculos = await _veiculoRepository.GetAllVeiculosAsync();
                if (veiculos == null) return null;

                var resultado = _mapper.Map<VeiculoDTO[]>(veiculos);
                return resultado;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VeiculoDTO> GetVeiculoByIdAsync(int veiculoId)
        {
            try
            {
                var veiculo = await _veiculoRepository.GetVeiculoByIdAsync(veiculoId);
                if (veiculo == null) return null;

                //Atraves das DTOS (Data Transfer Object ou Objeto de Transferência de Dados ) serve para não expor toda a informação ( não xpor o dominio) 
                //a quem estiver a construir o front end / consumir a API
                var resultado = _mapper.Map<VeiculoDTO>(veiculo);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
