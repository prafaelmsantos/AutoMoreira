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
    public class ModeloService: IModeloService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IModeloPersist _modeloPersist;
        private readonly IMapper _mapper;
        public ModeloService(IGeralPersist geralPersist, IModeloPersist modeloPersist, IMapper mapper)
        {
            _modeloPersist = modeloPersist;
            _geralPersist = geralPersist;
            _mapper = mapper;
        }
        public async Task<ModeloDto> AddModelos(ModeloDto model)
        {
            try
            {
                var modelo = _mapper.Map<Modelo>(model);
                _geralPersist.Add<Modelo>(modelo);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var modeloRetorno = await _modeloPersist.GetModeloByIdAsync(modelo.ModeloId);
                    return _mapper.Map<ModeloDto>(modeloRetorno);

                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ModeloDto> UpdateModelo(int modeloId, ModeloDto model)
        {
            try
            {
                var modelo = await _modeloPersist.GetModeloByIdAsync(modeloId);
                if (modelo == null) return null;

                model.ModeloId = modelo.ModeloId;

                //O DTO vai ser mapeado para o meu evento
                _mapper.Map(model, modelo);
                _geralPersist.Update<Modelo>(modelo);
              
                if (await _geralPersist.SaveChangesAsync())
                {
                  
                    var modeloRetorno = await _modeloPersist.GetModeloByIdAsync(modelo.ModeloId);
                    return _mapper.Map<ModeloDto>(modeloRetorno);
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
                var modelo = await _modeloPersist.GetModeloByIdAsync(modeloId);
                if (modelo == null) throw new Exception("Modelo para delete não encontrado.");

                _geralPersist.Delete<Modelo>(modelo);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ModeloDto[]> GetAllModelosAsync()
        {
            try
            {
                var modelos = await _modeloPersist.GetAllModelosAsync();
                if (modelos == null) return null;

                var resultado = _mapper.Map<ModeloDto[]>(modelos);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ModeloDto> GetModeloByIdAsync(int modeloId)
        {
            try
            {
                var modelo = await _modeloPersist.GetModeloByIdAsync(modeloId);
                if (modelo == null) return null;

                //Atraves das DTOS (Data Transfer Object ou Objeto de Transferência de Dados ) serve para não expor toda a informação ( não xpor o dominio) 
                 //a quem estiver a construir o front end / consumir a API
                var resultado = _mapper.Map<ModeloDto>(modelo);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ModeloDto[]> GetModeloByMarcaAsync(string marcaNome)
        {
            try
            {
                var modelos = await _modeloPersist.GetModeloByMarcaAsync(marcaNome);
                if (modelos == null) return null;

                //Atraves das DTOS (Data Transfer Object ou Objeto de Transferência de Dados ) serve para não expor toda a informação ( não xpor o dominio) 
                 //a quem estiver a construir o front end / consumir a API
                var resultado = _mapper.Map<ModeloDto[]>(modelos);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        
    }
}