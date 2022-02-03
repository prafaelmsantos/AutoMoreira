using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AutoMoreira.Domain;
using AutoMoreira.Persistence;
using AutoMoreira.Persistence.Contextos;
using AutoMoreira.Application.Contratos;
using Microsoft.AspNetCore.Http;


namespace AutoMoreira.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VeiculosController : ControllerBase
    {
        private readonly IVeiculoService _veiculoService;

        public VeiculosController(IVeiculoService veiculoService)
        {
            _veiculoService = veiculoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var veiculos = await _veiculoService.GetAllVeiculosAsync();
                if (veiculos == null) return NotFound("Nenhum veiculo encontrado.");

                return Ok(veiculos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var veiculo = await _veiculoService.GetVeiculoByIdAsync(id);
                if (veiculo == null) return NotFound("Evento por Id não encontrado.");

                return Ok(veiculo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        
        [HttpPost]
        public async Task<IActionResult> Post(Veiculo model)
        {
            try
            {
                var veiculo = await _veiculoService.AddVeiculos(model);
                if (veiculo == null) return BadRequest("Erro ao tentar adicionar evento.");

                return Ok(veiculo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar eventos. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Veiculo model)
        {
            try
            {
                var veiculo = await _veiculoService.UpdateVeiculo(id, model);
                if (veiculo == null) return BadRequest("Erro ao tentar adicionar evento.");

                return Ok(veiculo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar eventos. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                return await _veiculoService.DeleteVeiculo(id) ? 
                       Ok("Deletado") : 
                       BadRequest("Evento não deletado");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar eventos. Erro: {ex.Message}");
            }
        }
    }
}