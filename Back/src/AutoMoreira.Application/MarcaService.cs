using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMoreira.Application.Dtos;
using AutoMoreira.Application.Contratos;
using AutoMoreira.Domain;
using AutoMoreira.Persistence.Contratos;

namespace AutoMoreira.Application
{
    public class MarcaService: IMarcaService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IMarcaPersist _marcaPersist;
        private readonly IMapper _mapper;
        public MarcaService(IGeralPersist geralPersist, IMarcaPersist marcaPersist, IMapper mapper)
        {
            _marcaPersist = marcaPersist;
            _geralPersist = geralPersist;
            _mapper = mapper;
        }
        public async Task<MarcaDto> AddMarcas(MarcaDto model)
        {
            try
            {
                var marca = _mapper.Map<Marca>(model);
                _geralPersist.Add<Marca>(marca);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var marcaRetorno = await _marcaPersist.GetMarcaByIdAsync(marca.MarcaId);
                    return _mapper.Map<MarcaDto>(marcaRetorno);

                  
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<MarcaDto> UpdateMarca(int marcaId, MarcaDto model)
        {
            try
            {
                var marca= await _marcaPersist.GetMarcaByIdAsync(marcaId);
                if (marca == null) return null;

                model.MarcaId = marca.MarcaId;
                //O DTO vai ser mapeado para o meu evento
                _mapper.Map(model, marca);

                _geralPersist.Update(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    var marcaRetorno = await _marcaPersist.GetMarcaByIdAsync(marca.MarcaId);
                    return _mapper.Map<MarcaDto>(marcaRetorno);

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
                var marca= await _marcaPersist.GetMarcaByIdAsync(marcaId);
                if (marca == null) throw new Exception("Marca para delete não encontrado.");

                _geralPersist.Delete<Marca>(marca);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<MarcaDto[]> GetAllMarcasAsync()
        {
            try
            {
                var marcas = await _marcaPersist.GetAllMarcasAsync();
                if (marcas == null) return null;

                var resultado = _mapper.Map<MarcaDto[]>(marcas);
                return resultado;

             
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<MarcaDto> GetMarcaByIdAsync(int marcaId)
        {
            try
            {
                var marca = await _marcaPersist.GetMarcaByIdAsync(marcaId);
                if (marca== null) return null;

                //Atraves das DTOS (Data Transfer Object ou Objeto de Transferência de Dados ) serve para não expor toda a informação ( não xpor o dominio) 
                 //a quem estiver a construir o front end / consumir a API
                var resultado = _mapper.Map<MarcaDto>(marca);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        
    }
}