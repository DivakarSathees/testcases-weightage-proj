using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using dotnetapp.Models;

namespace dotnetapp.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
    }

}
