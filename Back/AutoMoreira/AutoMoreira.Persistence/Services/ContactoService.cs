using AutoMapper;
using AutoMoreira.Core.Dto;
using AutoMoreira.Core.Models;
using AutoMoreira.Persistence.Interfaces.Repositories;
using AutoMoreira.Persistence.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Services
{
    public class ContactoService : IContactoService
    {
        private readonly IBaseRepository _baseRepository;
        private readonly IContactoRepository _contactoRepository;
        private readonly IMapper _mapper;

        public ContactoService(
        IBaseRepository baseRepository,
        IContactoRepository contactoRepository,
        IMapper mapper)
        {
            _baseRepository = baseRepository;
            _contactoRepository = contactoRepository;
            _mapper = mapper;

        }
        public async Task<ContactoDTO> AddContactos(ContactoDTO model)
        {
            try
            {
                var contacto = _mapper.Map<Contacto>(model);
                _baseRepository.Add<Contacto>(contacto);

                if (await _baseRepository.SaveChangesAsync())
                {
                    var contactoRetorno = await _contactoRepository.GetContactoByIdAsync(contacto.ContactoId);
                    return _mapper.Map<ContactoDTO>(contactoRetorno);


                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public async Task<bool> DeleteContacto(int contactoId)
        {
            try
            {
                var contacto = await _contactoRepository.GetContactoByIdAsync(contactoId);
                if (contacto == null) throw new Exception("Contacto para apagar não encontrado.");

                _baseRepository.Delete<Contacto>(contacto);
                return await _baseRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ContactoDTO[]> GetAllContactosAsync()
        {
            try
            {
                var contactos = await _contactoRepository.GetAllContactosAsync();
                if (contactos == null) return null;

                var resultado = _mapper.Map<ContactoDTO[]>(contactos);
                return resultado;


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ContactoDTO> GetContactoByIdAsync(int contactoId)
        {
            try
            {
                var contacto = await _contactoRepository.GetContactoByIdAsync(contactoId);
                if (contacto == null) return null;

                //Atraves das DTOS (Data Transfer Object ou Objeto de Transferência de Dados ) serve para não expor toda a informação ( não xpor o dominio) 
                //a quem estiver a construir o front end / consumir a API
                var resultado = _mapper.Map<ContactoDTO>(contacto);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
