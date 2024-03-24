using System;
using System.Collections.Generic;
using System.Linq;
using dotnetapp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsAcademyJobHiring.Data;

namespace dotnetapp.Controllers
{
    [Route("api/shoppingcart")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ShoppingCartController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET /api/shoppingcart
        [HttpGet]
        public IActionResult GetCartItems(int page = 1, int pageSize = 10)
        {
           try
           {
               var totalCartItems = _context.CartItems.Count();
               var paginatedCartItems = _context.CartItems
                   .Skip((page - 1) * pageSize)
                   .Take(pageSize)
                   .ToList();

               return Ok(new
               {
                   Page = page,
                   PageSize = pageSize,
                   TotalCount = totalCartItems,
                   Items = paginatedCartItems
               });
           }
           catch (Exception ex)
           {
               return StatusCode(500, ex.Message); // Handle internal server error
           }
        }

        // POST /api/shoppingcart
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()

        [HttpPost]
        public IActionResult AddCartItem([FromBody] CartItem item)
        {
           try
           {
               if (item == null)
               {
                   return BadRequest("Invalid request payload"); // 400 Bad Request
               }

               _context.CartItems.Add(item);
               _context.SaveChanges();

               return CreatedAtAction(nameof(GetCartItems), new { id = item.CartItemID }, item); // 201 Created
           }
           catch (Exception ex)
           {
               return StatusCode(500, ex.Message); // Handle internal server error
           }
        }
    }
}
