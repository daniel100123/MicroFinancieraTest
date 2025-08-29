namespace MicroFinanciera.Models
{
  public class Access
  {
    public long id { get; set; }
    public System.DateTime entry { get; set; }
    public System.DateTime exit { get; set; }
    public string? equipment { get; set; }
    public string? IPPublic { get; set; }
    public string? explorer { get; set; }
    public string? mac { get; set; }
    public int userID { get; set; }
  }
}
