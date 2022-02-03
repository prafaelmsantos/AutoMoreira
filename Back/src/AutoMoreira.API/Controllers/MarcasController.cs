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
    public class MarcasController : ControllerBase
    {
        private readonly IMarcaService _marcaService;

        public MarcasController(IMarcaService marcaService)
        {
            _marcaService = marcaService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var marcas = await _marcaService.GetAllMarcasAsync();
                if (marcas == null) return NotFound("Nenhum veiculo encontrado.");

                return Ok(marcas);
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
                var marca = await _marcaService.GetMarcaByIdAsync(id);
                if (marca == null) return NotFound("Evento por Id não encontrado.");

                return Ok(marca);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        
        [HttpPost]
        public async Task<IActionResult> Post(Marca model)
        {
            try
            {
                var marca = await _marcaService.AddMarcas(model);
                if (marca == null) return BadRequest("Erro ao tentar adicionar evento.");

                return Ok(marca);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar eventos. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Marca model)
        {
            try
            {
                var marca = await _marcaService.UpdateMarca(id, model);
                if (marca == null) return BadRequest("Erro ao tentar adicionar evento.");

                return Ok(marca);
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
                return await _marcaService.DeleteMarca(id) ? 
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