
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Models
{
  public class AppDbContext : DbContext
  {
      public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
      {
      }

        public DbSet<Review> Reviews { get; set; }
  }
}
