using AutoMoreira.Core.Models;
using AutoMoreira.Core.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMoreira.Persistence.Context
{
    public class AppDbContext : IdentityDbContext<User, Role, int, 
                                                   IdentityUserClaim<int>, 
                                                   UserRole, 
                                                   IdentityUserLogin<int>, 
                                                   IdentityRoleClaim<int>, 
                                                   IdentityUserToken<int>>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Veiculo> Veiculos { get; set; }
        public DbSet<Marca> Marcas { get; set; }
        public DbSet<Modelo> Modelos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Necessario para o User se não, não funciona
            modelBuilder.Entity<UserRole>(userRole =>
            { //Outra maneira de fazer muitos para muitos
                userRole.HasKey(user => new { user.UserId, user.RoleId });
                //Um User tem uma Role. Uma Role tem muitos UserRoles. O RoleId é requerido, ou seja, sempre que criar um User, é criado tambem uma Role.
                userRole.HasOne(userRole => userRole.Role)
                        .WithMany(role => role.UserRoles)
                        .HasForeignKey(userRole => userRole.RoleId).IsRequired();

                userRole.HasOne(userRole => userRole.User)
                        .WithMany(role => role.UserRoles)
                        .HasForeignKey(userRole => userRole.UserId).IsRequired();
            }
            );


        }
    }
}
