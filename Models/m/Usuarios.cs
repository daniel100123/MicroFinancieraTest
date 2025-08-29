namespace MicroFinanciera.Models
{
  
  public class Usuarios
  {
    public int Id { get; set; }
    public string? Usuario { get; set; }
    public string? Contrasenia { get; set; }
    public int ProfileId { get; set; }
    public int StatusId { get; set; }
    
  }
}
