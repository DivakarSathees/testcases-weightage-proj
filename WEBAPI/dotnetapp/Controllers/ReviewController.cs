using dotnetapp.Models;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Controllers
{
    // Controllers/ReviewController.cs
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReviewController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetReviews()
        {
            var reviews = _context.Reviews.ToList();
            return Ok(reviews);
        }

        [HttpPost]
        public IActionResult AddReview([FromBody] Review review)
        {
            if (ModelState.IsValid)
            {
                _context.Reviews.Add(review);
                _context.SaveChanges();
                return Ok(review);
            }
            return BadRequest(ModelState);
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteReview(int id)
        {
            var reviewToDelete = _context.Reviews.Find(id);

            if (reviewToDelete == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(reviewToDelete);
            _context.SaveChanges();

            return Ok(reviewToDelete);
        }
    }

}
