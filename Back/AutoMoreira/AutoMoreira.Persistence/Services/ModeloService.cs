using AutoMapper;
using AutoMoreira.Core.Domains;
using AutoMoreira.Core.Dto;
using AutoMoreira.Persistence.Interfaces.Repositories;
using AutoMoreira.Persistence.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Services
{
    public class ModeloService : IModeloService
    {
        private readonly IBaseRepository _baseRepository;
        private readonly IModeloRepository _modeloRepository;
        private readonly IMapper _mapper;
        public ModeloService(IBaseRepository baseRepository, IModeloRepository modeloRepository, IMapper mapper)
        {
            _modeloRepository = modeloRepository;
            _baseRepository = baseRepository;
            _mapper = mapper;
        }
        public async Task<ModeloDTO> AddModelos(ModeloDTO model)
        {
            try
            {
                var modelo = _mapper.Map<Modelo>(model);
                _baseRepository.Add<Modelo>(modelo);

                if (await _baseRepository.SaveChangesAsync())
                {
                    var modeloRetorno = await _modeloRepository.GetModeloByIdAsync(modelo.ModeloId);
                    return _mapper.Map<ModeloDTO>(modeloRetorno);

                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ModeloDTO> UpdateModelo(int modeloId, ModeloDTO model)
        {
            try
            {
                var modelo = await _modeloRepository.GetModeloByIdAsync(modeloId);
                if (modelo == null) return null;

                model.ModeloId = modelo.ModeloId;

                //O DTO vai ser mapeado para o meu evento
                _mapper.Map(model, modelo);
                _baseRepository.Update<Modelo>(modelo);

                if (await _baseRepository.SaveChangesAsync())
                {

                    var modeloRetorno = await _modeloRepository.GetModeloByIdAsync(modelo.ModeloId);
                    return _mapper.Map<ModeloDTO>(modeloRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteModelo(int modeloId)
        {
            try
            {
                var modelo = await _modeloRepository.GetModeloByIdAsync(modeloId);
                if (modelo == null) throw new Exception("Modelo para apagar não encontrado.");

                _baseRepository.Delete<Modelo>(modelo);
                return await _baseRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ModeloDTO[]> GetAllModelosAsync()
        {
            try
            {
                var modelos = await _modeloRepository.GetAllModelosAsync();
                if (modelos == null) return null;

                var resultado = _mapper.Map<ModeloDTO[]>(modelos);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ModeloDTO> GetModeloByIdAsync(int modeloId)
        {
            try
            {
                var modelo = await _modeloRepository.GetModeloByIdAsync(modeloId);
                if (modelo == null) return null;

                //Atraves das DTOS (Data Transfer Object ou Objeto de Transferência de Dados ) serve para não expor toda a informação ( não xpor o dominio) 
                //a quem estiver a construir o front end / consumir a API
                var resultado = _mapper.Map<ModeloDTO>(modelo);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ModeloDTO[]> GetModeloByMarcaAsync(string marcaNome)
        {
            try
            {
                var modelos = await _modeloRepository.GetModeloByMarcaAsync(marcaNome);
                if (modelos == null) return null;

                //Atraves das DTOS (Data Transfer Object ou Objeto de Transferência de Dados ) serve para não expor toda a informação ( não xpor o dominio) 
                //a quem estiver a construir o front end / consumir a API
                var resultado = _mapper.Map<ModeloDTO[]>(modelos);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
