using AutoMoreira.Core.Domains;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Interfaces.Repositories
{
    public interface IMarcaRepository
    {
        Task<Marca[]> GetAllMarcasAsync();
        Task<Marca> GetMarcaByIdAsync(int marcaId);
    }
}
