using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Application.Contratos;
using AutoMoreira.Domain;
using AutoMoreira.Persistence.Contratos;

namespace AutoMoreira.Application
{
    public class ModeloService: IModeloService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IModeloPersist _modeloPersist;
        public ModeloService(IGeralPersist geralPersist, IModeloPersist modeloPersist)
        {
            _modeloPersist = modeloPersist;
            _geralPersist = geralPersist;
        }
        public async Task<Modelo> AddModelos(Modelo model)
        {
            try
            {
                _geralPersist.Add<Modelo>(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _modeloPersist.GetModeloByIdAsync(model.ModeloId);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Modelo> UpdateModelo(int modeloId, Modelo model)
        {
            try
            {
                var modelo = await _modeloPersist.GetModeloByIdAsync(modeloId);
                if (modelo == null) return null;

                model.ModeloId = modelo.ModeloId;

                _geralPersist.Update(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _modeloPersist.GetModeloByIdAsync(model.ModeloId);
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
                if (modelo == null) throw new Exception("Evento para delete não encontrado.");

                _geralPersist.Delete<Modelo>(modelo);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Modelo[]> GetAllModelosAsync()
        {
            try
            {
                var modelos = await _modeloPersist.GetAllModelosAsync();
                if (modelos == null) return null;

                return modelos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Modelo> GetModeloByIdAsync(int modeloId)
        {
            try
            {
                var modelos = await _modeloPersist.GetModeloByIdAsync(modeloId);
                if (modelos == null) return null;

                return modelos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Modelo[]> GetModeloByMarcaIdAsync(int marcaId)
        {
            try
            {
                var modelos = await _modeloPersist.GetModeloByMarcaIdAsync(marcaId);
                if (modelos == null) return null;

                return modelos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        
    }
}