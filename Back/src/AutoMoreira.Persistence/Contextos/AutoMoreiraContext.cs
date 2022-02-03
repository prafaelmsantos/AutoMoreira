using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Domain;
using Microsoft.EntityFrameworkCore;

namespace AutoMoreira.Persistence.Contextos
{
    public class AutoMoreiraContext: DbContext
    {
        public AutoMoreiraContext(DbContextOptions<AutoMoreiraContext>options): base(options) {}
        
        public DbSet<Veiculo> Veiculos { get; set;}
        public DbSet<Marca> Marcas { get; set;}
        public DbSet<Modelo> Modelos { get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        

        }
    }
}