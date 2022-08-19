using AutoMoreira.Core.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Interfaces.Repositories
{
    public interface IUserRepository : IBaseRepository
    {
        //Retorna uma lista de utilizadores
        Task<IEnumerable<User>> GetUsersAsync();
        //Retorna um utilizador
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByUserNameAsync(string userName);
    }
}
