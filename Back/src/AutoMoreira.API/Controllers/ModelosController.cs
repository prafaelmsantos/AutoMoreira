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
    public class ModelosController : ControllerBase
    {
        private readonly IModeloService _modeloService;

        public ModelosController(IModeloService modeloService)
        {
            _modeloService = modeloService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var modelos = await _modeloService.GetAllModelosAsync();
                if (modelos == null) return NotFound("Nenhum veiculo encontrado.");

                return Ok(modelos);
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
                var veiculo = await _modeloService.GetModeloByIdAsync(id);
                if (veiculo == null) return NotFound("Evento por Id não encontrado.");

                return Ok(veiculo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }
        [HttpGet("marcaId/{id}")]
        public async Task<IActionResult> GetByMarcaId(int id)
        {
            try
            {
                var veiculo = await _modeloService.GetModeloByMarcaIdAsync(id);
                if (veiculo == null) return NotFound("Veiculo por Id não encontrado.");

                return Ok(veiculo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        
        [HttpPost]
        public async Task<IActionResult> Post(Modelo model)
        {
            try
            {
                var veiculo = await _modeloService.AddModelos(model);
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
        public async Task<IActionResult> Put(int id, Modelo model)
        {
            try
            {
                var veiculo = await _modeloService.UpdateModelo(id, model);
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
                return await _modeloService.DeleteModelo(id) ? 
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