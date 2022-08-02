using AutoMoreira.Core.Models;
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
    public class VeiculoRepository : IVeiculoRepository
    {
        private readonly AppDbContext _context;
        public VeiculoRepository(AppDbContext context)
        {
            _context = context;
            // _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Veiculo[]> GetAllVeiculosAsync()
        {
            IQueryable<Veiculo> query = _context.Veiculos;

            query = query.AsNoTracking().Include(x => x.Marca).Include(y => y.Modelo).OrderBy(v => v.VeiculoId);

            return await query.ToArrayAsync();
        }

        public async Task<Veiculo> GetVeiculoByIdAsync(int Id)
        {
            IQueryable<Veiculo> query = _context.Veiculos;


            query = query.AsNoTracking().Include(x => x.Marca).Include(y => y.Modelo).OrderBy(p => p.VeiculoId)
                         .Where(p => p.VeiculoId == Id);

            return await query.FirstOrDefaultAsync();
        }
    }
}
