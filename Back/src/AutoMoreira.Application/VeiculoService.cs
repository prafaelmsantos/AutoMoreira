using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Application.Contratos;
using AutoMoreira.Domain;
using AutoMoreira.Persistence.Contratos;

namespace AutoMoreira.Application
{
    public class VeiculoService: IVeiculoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IVeiculoPersist _veiculoPersist;
        public VeiculoService(IGeralPersist geralPersist, IVeiculoPersist veiculoPersist)
        {
            _veiculoPersist = veiculoPersist;
            _geralPersist = geralPersist;
        }
        public async Task<Veiculo> AddVeiculos(Veiculo model)
        {
            try
            {
                _geralPersist.Add<Veiculo>(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _veiculoPersist.GetVeiculoByIdAsync(model.VeiculoId);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Veiculo> UpdateVeiculo(int veiculoId, Veiculo model)
        {
            try
            {
                var veiculo = await _veiculoPersist.GetVeiculoByIdAsync(veiculoId);
                if (veiculo == null) return null;

                model.VeiculoId = veiculo.VeiculoId;

                _geralPersist.Update(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _veiculoPersist.GetVeiculoByIdAsync(model.VeiculoId);
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
                var veiculo= await _veiculoPersist.GetVeiculoByIdAsync(veiculoId);
                if (veiculo == null) throw new Exception("Evento para delete não encontrado.");

                _geralPersist.Delete<Veiculo>(veiculo);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Veiculo[]> GetAllVeiculosAsync()
        {
            try
            {
                var veiculos = await _veiculoPersist.GetAllVeiculosAsync();
                if (veiculos == null) return null;

                return veiculos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Veiculo> GetVeiculoByIdAsync(int veiculoId)
        {
            try
            {
                var veiculos = await _veiculoPersist.GetVeiculoByIdAsync(veiculoId);
                if (veiculos== null) return null;

                return veiculos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        
    }
}