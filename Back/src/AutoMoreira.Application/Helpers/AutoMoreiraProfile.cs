using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMoreira.Application.Dtos;
using AutoMoreira.Domain;

namespace AutoMoreira.Application.Helpers
{
    public class AutoMoreiraProfile: Profile
    {
        public AutoMoreiraProfile(){

            //Ele cria do evento para o DTO e do DTO para o Evento
            CreateMap<Veiculo, VeiculoDto>().ReverseMap();

            CreateMap<Marca, MarcaDto>().ReverseMap();

            CreateMap<Modelo, ModeloDto>().ReverseMap();

        }
    }
}