namespace dotnetapp.Models
{
    public class Carservice
    {
		[Required]
        public int id { get; set; }
        [MaxLength(255, ErrorMessage = "Car name cannot exceed 255 characters.")]
        public string car_name { get; set; }
        public string car_number { get; set; }
        public string car_varient { get; set; }
        public string customer_name { get; set; }
        public string complaint { get; set; }
        public string phonenumber { get; set; }
        public string address { get; set; }
    }
}
