using AutoMapper;
using AutoMoreira.Core.Domains;
using AutoMoreira.Core.Dto;
using AutoMoreira.Persistence.Interfaces.Repositories;
using AutoMoreira.Persistence.Interfaces.Services;
using System;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Services
{
    public class MarcaService : IMarcaService
    {
        private readonly IBaseRepository _baseRepository;
        private readonly IMarcaRepository _marcaRepository;
        private readonly IMapper _mapper;

        public MarcaService(
        IBaseRepository baseRepository,
        IMarcaRepository marcaRepository,
        IMapper mapper)
        {
            _baseRepository = baseRepository;
            _marcaRepository = marcaRepository;
            _mapper = mapper;

        }

        public async Task<MarcaDTO> AddMarcas(MarcaDTO model)
        {
            try
            {
                var marca = _mapper.Map<Marca>(model);
                _baseRepository.Add<Marca>(marca);

                if (await _baseRepository.SaveChangesAsync())
                {
                    var marcaRetorno = await _marcaRepository.GetMarcaByIdAsync(marca.MarcaId);
                    return _mapper.Map<MarcaDTO>(marcaRetorno);


                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<MarcaDTO> UpdateMarca(int marcaId, MarcaDTO model)
        {
            try
            {
                var marca = await _marcaRepository.GetMarcaByIdAsync(marcaId);
                if (marca == null) return null;

                model.MarcaId = marca.MarcaId;
                //O DTO vai ser mapeado para o meu evento
                _mapper.Map(model, marca);

                _baseRepository.Update<Marca>(marca);
                if (await _baseRepository.SaveChangesAsync())
                {
                    var marcaRetorno = await _marcaRepository.GetMarcaByIdAsync(marca.MarcaId);
                    return _mapper.Map<MarcaDTO>(marcaRetorno);

                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteMarca(int marcaId)
        {
            try
            {
                var marca = await _marcaRepository.GetMarcaByIdAsync(marcaId);
                if (marca == null) throw new Exception("Marca para apagar não encontrado.");

                _baseRepository.Delete<Marca>(marca);
                return await _baseRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<MarcaDTO[]> GetAllMarcasAsync()
        {
            try
            {
                var marcas = await _marcaRepository.GetAllMarcasAsync();
                if (marcas == null) return null;

                var resultado = _mapper.Map<MarcaDTO[]>(marcas);
                return resultado;


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<MarcaDTO> GetMarcaByIdAsync(int marcaId)
        {
            try
            {
                var marca = await _marcaRepository.GetMarcaByIdAsync(marcaId);
                if (marca == null) return null;

                //Atraves das DTOS (Data Transfer Object ou Objeto de Transferência de Dados ) serve para não expor toda a informação ( não xpor o dominio) 
                //a quem estiver a construir o front end / consumir a API
                var resultado = _mapper.Map<MarcaDTO>(marca);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
