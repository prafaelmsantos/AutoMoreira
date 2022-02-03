using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Application.Contratos;
using AutoMoreira.Domain;
using AutoMoreira.Persistence.Contratos;

namespace AutoMoreira.Application
{
    public class MarcaService: IMarcaService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IMarcaPersist _marcaPersist;
        public MarcaService(IGeralPersist geralPersist, IMarcaPersist marcaPersist)
        {
            _marcaPersist = marcaPersist;
            _geralPersist = geralPersist;
        }
        public async Task<Marca> AddMarcas(Marca model)
        {
            try
            {
                _geralPersist.Add<Marca>(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _marcaPersist.GetMarcaByIdAsync(model.MarcaId);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Marca> UpdateMarca(int marcaId, Marca model)
        {
            try
            {
                var marca= await _marcaPersist.GetMarcaByIdAsync(marcaId);
                if (marca == null) return null;

                model.MarcaId = marca.MarcaId;

                _geralPersist.Update(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _marcaPersist.GetMarcaByIdAsync(model.MarcaId);
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
                if (marca == null) throw new Exception("Evento para delete não encontrado.");

                _geralPersist.Delete<Marca>(marca);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Marca[]> GetAllMarcasAsync()
        {
            try
            {
                var marcas = await _marcaPersist.GetAllMarcasAsync();
                if (marcas == null) return null;

                return marcas;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Marca> GetMarcaByIdAsync(int marcaId)
        {
            try
            {
                var marcas = await _marcaPersist.GetMarcaByIdAsync(marcaId);
                if (marcas== null) return null;

                return marcas;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        
    }
}