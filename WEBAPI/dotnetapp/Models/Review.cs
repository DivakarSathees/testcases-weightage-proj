
namespace dotnetapp.Models
{
    public class Review
    {
           public int ReviewId { get; set; }
           public string MovieName { get; set; }
           public string MovieDirector { get; set; }
           public string LeadCast { get; set; }
           public DateTime MovieReleaseDate { get; set; }
           public DateTime MovieReviewDate { get; set; }
           public string ReviewComments { get; set; }
           public int Rating { get; set; }
    }
}
