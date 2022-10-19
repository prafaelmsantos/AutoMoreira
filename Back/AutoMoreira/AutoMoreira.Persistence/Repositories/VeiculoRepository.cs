using AutoMoreira.Core.Domains;
using AutoMoreira.Persistence.Context;
using AutoMoreira.Persistence.Helpers;
using AutoMoreira.Persistence.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Repositories
{
    public class VeiculoRepository : IVeiculoRepository
    {
        private readonly AppDbContext _context;
        public VeiculoRepository(AppDbContext context)
        {
            _context = context;
            // _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Veiculo[]> GetAllAsync()
        {
            IQueryable<Veiculo> query = _context.Veiculos;

            query = query
                .AsNoTracking()
                .OrderBy(v => v.VeiculoId)
                .Include(x => x.Marca)
                .Include(x => x.Modelo);

            return await query.ToArrayAsync();
        }


        public async Task<PageList<Veiculo>> GetAllVeiculosAsync(PageParams pageParams)
        {
            IQueryable<Veiculo> query = _context.Veiculos;

            //Filtrar por tema - adicionar:
            //.Where(e => e.Tema.ToLower().Contains(pageParams.Term.ToLower()))

            query = query
                .AsNoTracking()
                .Include(x => x.Marca)
                .Include(y => y.Modelo)
                .OrderBy(v => v.VeiculoId);

            return await PageList<Veiculo>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize);
        }

        public async Task<Veiculo> GetVeiculoByIdAsync(int Id)
        {
            IQueryable<Veiculo> query = _context.Veiculos;


            query = query.AsNoTracking().Include(x => x.Marca).Include(y => y.Modelo).OrderBy(p => p.VeiculoId)
                         .Where(p => p.VeiculoId == Id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Veiculo[]> GetVeiculoByNovidadeAsync()
        {
            IQueryable<Veiculo> query = _context.Veiculos;


            query = query.AsNoTracking().Include(x => x.Marca).Include(y => y.Modelo).OrderBy(p => p.VeiculoId)
                         .Where(p => p.Novidade == true);

            return await query.ToArrayAsync();
        }
    }
}
