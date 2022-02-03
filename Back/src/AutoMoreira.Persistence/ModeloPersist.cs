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
    public class ModeloPersist: IModeloPersist
    {
        private readonly AutoMoreiraContext _context;
        public ModeloPersist(AutoMoreiraContext context)
        {
            _context = context;
        }

        public async Task<Modelo[]> GetAllModelosAsync()
        {
            IQueryable<Modelo> query = _context.Modelos;
                
            query = query.AsNoTracking().Include(x => x.Marca).OrderBy(m => m.ModeloId);

            return await query.ToArrayAsync();
        }

        public async Task<Modelo> GetModeloByIdAsync(int Id)
        {
            IQueryable<Modelo> query = _context.Modelos;


            query = query.AsNoTracking().Include(x => x.Marca).OrderBy(p => p.ModeloId)
                         .Where(p => p.ModeloId == Id);

            return await query.FirstOrDefaultAsync();
        }

        //Rafael
        public async Task<Modelo[]> GetModeloByMarcaIdAsync(int Id)
        {
            IQueryable<Modelo> query = _context.Modelos;


            query = query.AsNoTracking().Include(x => x.Marca).OrderBy(p => p.MarcaId)
                         .Where(p => p.MarcaId == Id);

            return await query.ToArrayAsync();
        }
        
    }
}