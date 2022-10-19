using AutoMoreira.Core.Domains;
using AutoMoreira.Persistence.Context;
using AutoMoreira.Persistence.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Repositories
{
    public class MarcaRepository : IMarcaRepository
    {
        private readonly AppDbContext _context;
        public MarcaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Marca[]> GetAllMarcasAsync()
        {
            IQueryable<Marca> query = _context.Marcas;

            query = query.AsNoTracking().OrderBy(v => v.MarcaId);

            return await query.ToArrayAsync();
        }

        public async Task<Marca> GetMarcaByIdAsync(int Id)
        {
            IQueryable<Marca> query = _context.Marcas;


            query = query.AsNoTracking().OrderBy(p => p.MarcaId)
                         .Where(p => p.MarcaId == Id);

            return await query.FirstOrDefaultAsync();
        }
    }
}
