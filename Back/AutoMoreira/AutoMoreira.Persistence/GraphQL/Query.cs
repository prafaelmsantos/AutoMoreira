using AutoMoreira.Core.Domains;
using AutoMoreira.Persistence.Interfaces.Repositories;
using AutoMoreira.Persistence.Interfaces.Services;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.GraphQL
{
    public class Query
    {
        [UsePaging]
        [HotChocolate.Types.UseFiltering]
        [UseSorting]

        public Task<Veiculo[]> GetVeiculos([Service] IVeiculoRepository _veiculoRepository)
        {

            return _veiculoRepository.GetAllAsync();
        }

        [UsePaging]
        [HotChocolate.Types.UseFiltering]
        [UseSorting]
        public Task<Marca[]> GetMarcas([Service] IMarcaRepository _marcaRepository)
        {

            return _marcaRepository.GetAllMarcasAsync();
        }

        [UsePaging]
        [HotChocolate.Types.UseFiltering]
        [UseSorting]
        public Task<Modelo[]> GetModelos([Service] IModeloRepository _modeloRepository)
        {

            return _modeloRepository.GetAllModelosAsync();
        }

        [UsePaging]
        [HotChocolate.Types.UseFiltering]
        [UseSorting]
        public Task<Contacto[]> GetContactos([Service] IContactoRepository _contactoRepository)
        {

            return _contactoRepository.GetAllContactosAsync();
        }

    }
}
