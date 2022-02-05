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
using AutoMoreira.Application.Dtos;


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
                if (modelos == null) return NoContent();

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
                if (veiculo == null) return NoContent();

                return Ok(veiculo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }
        [HttpGet("{marcaNome}/marcaNome")]
        public async Task<IActionResult> GetByMarca(string marcaNome)
        {
            try
            {
                var modelos = await _modeloService.GetModeloByMarcaAsync(marcaNome);
                if (modelos== null) return NoContent();

                return Ok(modelos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar os modelos. Erro: {ex.Message}");
            }
        }

        
        [HttpPost]
        public async Task<IActionResult> Post(ModeloDto model)
        {
            try
            {
                var veiculo = await _modeloService.AddModelos(model);
                if (veiculo == null) return NoContent();

                return Ok(veiculo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar eventos. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ModeloDto model)
        {
            try
            {
                var veiculo = await _modeloService.UpdateModelo(id, model);
                if (veiculo == null) return NoContent();

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