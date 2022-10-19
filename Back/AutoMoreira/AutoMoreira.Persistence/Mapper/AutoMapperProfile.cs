using AutoMapper;
using AutoMoreira.Core.Domains;
using AutoMoreira.Core.Domains.Identity;
using AutoMoreira.Core.Dto;
using AutoMoreira.Core.Dto.Identity;


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

            CreateMap<User, UserDTO>().ReverseMap();

            CreateMap<User, UserLoginDTO>().ReverseMap();

            CreateMap<User, UserUpdateDTO>().ReverseMap();

            CreateMap<Contacto, ContactoDTO>().ReverseMap();

        }
    }
}
