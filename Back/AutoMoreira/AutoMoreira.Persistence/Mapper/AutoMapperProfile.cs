using AutoMapper;
using AutoMoreira.Core.Dto;
using AutoMoreira.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {

            //Ele cria do evento para o DTO e do DTO para o Evento
            CreateMap<Veiculo, VeiculoDTO>().ReverseMap();

            CreateMap<Marca, MarcaDTO>().ReverseMap();

            CreateMap<Modelo, ModeloDTO>().ReverseMap();

        }
    }
}
