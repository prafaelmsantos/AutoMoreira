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
    public class ModeloRepository : IModeloRepository
    {
        private readonly AppDbContext _context;
        public ModeloRepository(AppDbContext context)
        {
            _context = context;

        }

        public async Task<Modelo[]> GetAllModelosAsync()
        {
            IQueryable<Modelo> query = _context.Modelos;

            query = query.AsNoTracking().OrderBy(m => m.ModeloId);

            return await query.ToArrayAsync();
        }

        public async Task<Modelo> GetModeloByIdAsync(int Id)
        {
            IQueryable<Modelo> query = _context.Modelos;


            query = query.AsNoTracking().OrderBy(p => p.ModeloId)
                         .Where(p => p.ModeloId == Id);

            return await query.FirstOrDefaultAsync();
        }

        //Rafael
        public async Task<Modelo[]> GetModeloByMarcaAsync(string marcaNome)
        {
            IQueryable<Modelo> query = _context.Modelos;


            query = query.AsNoTracking().OrderBy(x => x.MarcaId);

            return await query.ToArrayAsync();
        }

    }
}
