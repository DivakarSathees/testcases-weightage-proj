
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Models
{
  public class OtherDbContext : DbContext
  {
      public OtherDbContext(DbContextOptions<OtherDbContext> options) : base(options)
      {
      }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Actor> Actors { get; set; }
  }
}
