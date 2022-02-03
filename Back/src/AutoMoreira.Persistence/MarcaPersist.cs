using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMoreira.Persistence.Contratos;
using AutoMoreira.Domain;
using AutoMoreira.Persistence.Contextos;

namespace AutoMoreira.Persistence
{
    public class MarcaPersist: IMarcaPersist
    {
        private readonly AutoMoreiraContext _context;
        public MarcaPersist(AutoMoreiraContext context)
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