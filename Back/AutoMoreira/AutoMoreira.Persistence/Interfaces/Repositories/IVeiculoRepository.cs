using AutoMoreira.Core.Domains;
using AutoMoreira.Persistence.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Interfaces.Repositories
{
    public interface IVeiculoRepository
    {
        //Sem paginação para graphQL
        Task<Veiculo[]> GetAllAsync();

        //Com Paginação
        Task<PageList<Veiculo>> GetAllVeiculosAsync(PageParams pageParams);
        Task<Veiculo> GetVeiculoByIdAsync(int veiculoId);
        Task<Veiculo[]> GetVeiculoByNovidadeAsync();
    }
}
