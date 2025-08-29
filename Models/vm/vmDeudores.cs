namespace MicroFinanciera.Models
{
  public class vmDeudores
  {
    public vmDeudores()
    {
      detail = new List<vmDeudoresDetails>();
    }

    public int id { get; set; }
    public string? name { get; set; }
    public double credito { get; set; }
    public string? fechaInicio { get; set; }
    public double pagoTotalSemanal { get; set; }
    public double ahorro { get; set; }
    public int pagosPendientes {  get; set; }
    public double comision {  get; set; }
    public double adeudoTotal {  get; set; }
    public string? fechaFinaliza {  get; set; }
    public int creditoId { get; set; }
    public List<vmDeudoresDetails> detail { get; set; }
  }

  public class vmDeudoresDetails
  {
    public int id { get; set; }
    public int semana { get; set; }
    public string? fechaPago { get; set; }
    public double comision { get; set; }
    public int? dias {  get; set; }
  }
}
