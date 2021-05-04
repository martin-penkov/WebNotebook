using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace NotebookBotAPI.Models
{
    public class NotebookDbContext : IdentityDbContext<User>
    {
        public NotebookDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        //entities
        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
