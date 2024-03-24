namespace dotnetapp.Models
{
    public class ShoppingCart
    {
        public int ShoppingCartID { get; set; }
        public List<CartItem> Items { get; set; }
    }
}
