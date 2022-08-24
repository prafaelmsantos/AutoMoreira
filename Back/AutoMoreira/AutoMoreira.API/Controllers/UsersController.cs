using AutoMoreira.API.Extensions;
using AutoMoreira.Core.Dto.Identity;
using AutoMoreira.Persistence.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AutoMoreira.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public UsersController(IUserService userService,
                                 ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                //var userName = User.FindFirst(ClaimTypes.Name)?.Value;
                var userName = User.GetUserName();
                var user = await _userService.GetUserByUserNameAsync(userName);
                return Ok(user);

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar encontrar conta utilizador. Erro: {ex.Message}");
            }

        }
        [HttpPost("CreateUser")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateUser(UserDTO userDTO)
        {
            try
            {
                if (await _userService.UserExists(userDTO.UserName))
                {
                    return BadRequest("O utilizador já existe!");
                }
                var user = await _userService.CreateAccountAsync(userDTO);
                if (user != null)
                {
                    return Ok(new
                    {
                        userName = user.UserName,
                        PrimeiroNome = user.PrimeiroNome,
                        token = _tokenService.CreateToken(user).Result

                    });
                }
                return BadRequest("Utilizador não criado! Tente mais tarde...");


            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar criar conta utilizador. Erro: {ex.Message}");
            }

        }
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginUser(UserUpdateDTO userLoginDTO)
        {
            try
            {
                //Verifica se o utilizador existe
                var user = await _userService.GetUserByUserNameAsync(userLoginDTO.UserName);
                if (user == null)
                {
                    return Unauthorized("Utilizador ou password inválida!");
                }
                //Verificar se o username e a senha estao bem
                var result = await _userService.CheckUserPasswordAsync(user, userLoginDTO.Password);
                if (!result.Succeeded)
                {
                    return Unauthorized();
                }
                return Ok(new
                {
                    userName = user.UserName,
                    PrimeiroNome = user.PrimeiroNome,
                    token = _tokenService.CreateToken(user).Result

                });

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar fazer Login. Erro: {ex.Message}");
            }

        }
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UserUpdateDTO userUpdateDTO)
        {
            try
            {
                //Caso o userName não tente passar um token diferente
                if (userUpdateDTO.UserName != User.GetUserName())
                {
                    return Unauthorized("O Utilizador é invalido!");
                }
                var user = await _userService.GetUserByUserNameAsync(User.GetUserName());
                if (user == null) return Unauthorized("Utilizador Inválido!");

                var userReturn = await _userService.UpdateAccount(userUpdateDTO);
                if (userReturn == null) return NoContent();

                return Ok(new
                {
                    userName = userReturn.UserName,
                    PrimeroNome = userReturn.PrimeiroNome,
                    token = _tokenService.CreateToken(userReturn).Result
                });
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar Utilizador. Erro: {ex.Message}");
            }
        }

    }
}
