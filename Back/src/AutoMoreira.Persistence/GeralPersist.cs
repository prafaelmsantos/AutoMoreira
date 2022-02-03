using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMoreira.Persistence.Contextos;
using AutoMoreira.Persistence.Contratos;


namespace AutoMoreira.Persistence
{
    public class GeralPersist: IGeralPersist
    {
        private readonly AutoMoreiraContext _context;
        public GeralPersist(AutoMoreiraContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.AddAsync(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

    }
}