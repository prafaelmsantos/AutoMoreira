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
    public class VeiculoService: IVeiculoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IVeiculoPersist _veiculoPersist;
        private readonly IMapper _mapper;
        public VeiculoService(IGeralPersist geralPersist, IVeiculoPersist veiculoPersist, IMapper mapper)
        {
            _veiculoPersist = veiculoPersist;
            _geralPersist = geralPersist;
            _mapper = mapper;
        }
        public async Task<VeiculoDto> AddVeiculos(VeiculoDto model)
        {
            
            try
            {
                var veiculo = _mapper.Map<Veiculo>(model);
                _geralPersist.Add<Veiculo>(veiculo);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var veiculoRetorno = await _veiculoPersist.GetVeiculoByIdAsync(veiculo.VeiculoId);
                    return _mapper.Map<VeiculoDto>(veiculoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VeiculoDto> UpdateVeiculo(int veiculoId, VeiculoDto model)
        {
            try
            {
                var veiculo = await _veiculoPersist.GetVeiculoByIdAsync(veiculoId);
                if (veiculo == null) return null;

                model.VeiculoId = veiculo.VeiculoId;

                //O DTO vai ser mapeado para o meu evento
                _mapper.Map(model, veiculo);

                _geralPersist.Update<Veiculo>(veiculo);
                
                if (await _geralPersist.SaveChangesAsync())
                {
                    var veiculoRetorno = await _veiculoPersist.GetVeiculoByIdAsync(veiculo.VeiculoId);
                    return _mapper.Map<VeiculoDto>(veiculoRetorno);
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
                if (veiculo == null) throw new Exception("Veiculo para delete não encontrado.");

                _geralPersist.Delete<Veiculo>(veiculo);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VeiculoDto[]> GetAllVeiculosAsync()
        {
            try
            {
                var veiculos = await _veiculoPersist.GetAllVeiculosAsync();
                if (veiculos == null) return null;

                var resultado = _mapper.Map<VeiculoDto[]>(veiculos);
                return resultado;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VeiculoDto> GetVeiculoByIdAsync(int veiculoId)
        {
            try
            {
                var veiculo = await _veiculoPersist.GetVeiculoByIdAsync(veiculoId);
                if (veiculo== null) return null;

                //Atraves das DTOS (Data Transfer Object ou Objeto de Transferência de Dados ) serve para não expor toda a informação ( não xpor o dominio) 
                 //a quem estiver a construir o front end / consumir a API
                var resultado = _mapper.Map<VeiculoDto>(veiculo);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        
    }
}