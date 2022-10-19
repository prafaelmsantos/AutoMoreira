using AutoMapper;
using AutoMoreira.Core.Domains.Identity;
using AutoMoreira.Core.Dto.Identity;
using AutoMoreira.Persistence.Interfaces.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        //Quando criamos um token, é preciso uma chave de verificação 
        //(chave de segurança- chave de encriptação)
        public readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config,
                            UserManager<User> userManager,
                            IMapper mapper)
        {
            _config = config;
            _userManager = userManager;
            _mapper = mapper;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        public async Task<string> CreateToken(UserUpdateDTO userUpdateDTO)
        {
            //Podia mapiar o userDto em vez do userupdateDto. 
            //Mass como mais a frente onde vai ser usado o createToken é necessario mapiar o userupdatedto,
            //entao coloca-se ja aqui
            var user = _mapper.Map<User>(userUpdateDTO);

            //Claims são afirmações sobre o utilizador ( nome, idade, foto, ...).
            //Neste caso estou a adicionar para dentro das claims, uma claim do userId e outra do UserName,
            //ou seja, estou a criar claims baseadas no meu utilizador
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };
            //Vou buscar todas as roles do utilizador
            var roles = await _userManager.GetRolesAsync(user);

            //Ele vai adicionar para dentro de claims varias outras claims(Roles). O Select é basicamente um ciclo for
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            //
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            //Montar a estrutura do token.

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                //O token expira em 1 dia
                Expires = DateTime.Now.AddDays(1),
                //chave de criptografia
                SigningCredentials = creds

            };

            //Formato JWT
            var tokenHandler = new JwtSecurityTokenHandler();

            //Criação do token
            var token = tokenHandler.CreateToken(tokenDescription);

            //Escrevo token no formato JWT
            return tokenHandler.WriteToken(token);
        }
    }
}
