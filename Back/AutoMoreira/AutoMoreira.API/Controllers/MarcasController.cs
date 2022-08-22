using AutoMoreira.Core.Dto;
using AutoMoreira.Persistence.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AutoMoreira.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MarcasController : ControllerBase
    {
        private readonly IMarcaService _marcaService;

        public MarcasController(IMarcaService marcaService)
        {
            _marcaService = marcaService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
            try
            {
                var marcas = await _marcaService.GetAllMarcasAsync();
                if (marcas == null) return NoContent();

                return Ok(marcas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar marcas. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var marca = await _marcaService.GetMarcaByIdAsync(id);
                if (marca == null) return NoContent();

                return Ok(marca);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar marcas. Erro: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post(MarcaDTO model)
        {
            try
            {
                var marca = await _marcaService.AddMarcas(model);
                if (marca == null) return NotFound("Erro a criar a marca!");

                return Ok(marca);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar marcas. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, MarcaDTO model)
        {
            try
            {
                var marca = await _marcaService.UpdateMarca(id, model);
                if (marca == null) return NoContent();

                return Ok(marca);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar marcas. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var marca = await _marcaService.GetMarcaByIdAsync(id);
                if (marca == null) return NoContent();

                if (await _marcaService.DeleteMarca(id))
                {
                  
                   return Ok(new { message = "Apagado" });

                }
                else
                {
                    throw new Exception("Marca não apagado");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar apagar marcas. Erro: {ex.Message}");
            }
        }
    }
}
