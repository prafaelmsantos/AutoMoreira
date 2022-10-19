using AutoMapper;
using AutoMoreira.Core.Domains;
using AutoMoreira.Core.Dto;
using AutoMoreira.Persistence.Helpers;
using AutoMoreira.Persistence.Interfaces.Repositories;
using AutoMoreira.Persistence.Interfaces.Services;
using System;
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
                if (veiculo == null) throw new Exception("Veiculo para apagar não encontrado.");

                _baseRepository.Delete<Veiculo>(veiculo);
                return await _baseRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PageList<VeiculoDTO>> GetAllVeiculosAsync(PageParams pageParams)
        {
            try
            {
                var veiculos = await _veiculoRepository.GetAllVeiculosAsync(pageParams);
                if (veiculos == null) return null;

                var resultado = _mapper.Map<PageList<VeiculoDTO>>(veiculos);

                //Manual Mapper
                resultado.CurrentPage = veiculos.CurrentPage;
                resultado.TotalPages = veiculos.TotalPages;
                resultado.PageSize = veiculos.PageSize;
                resultado.TotalCount = veiculos.TotalCount;
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

        public async Task<VeiculoDTO[]> GetVeiculoByNovidadeAsync()
        {
            try
            {
                var veiculos = await _veiculoRepository.GetVeiculoByNovidadeAsync();
                if (veiculos == null) return null;
                var resultado = _mapper.Map<VeiculoDTO[]>(veiculos);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
