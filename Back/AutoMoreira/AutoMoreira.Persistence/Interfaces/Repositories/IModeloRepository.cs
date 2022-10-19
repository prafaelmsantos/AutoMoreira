using AutoMoreira.Core.Domains;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Interfaces.Repositories
{
    public interface IModeloRepository
    {
        Task<Modelo[]> GetAllModelosAsync();
        Task<Modelo> GetModeloByIdAsync(int modeloId);
        Task<Modelo[]> GetModeloByMarcaAsync(string marcaNome);
    }
}
