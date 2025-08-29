namespace MicroFinanciera.Models
{
  public class vmDetalleSemanalCliente
  {
    public int id { get; set; }
    public int clienteId { get; set; }
    public int semana { get; set; }
    public string? nombre { get; set; }
    public string? fechaPago { get; set; }
    public string? fechaRealizada { get; set; }
    public double? ahorro { get; set; }
    public double cantidadPagada { get; set; }
    public double? comision { get; set; }
    public double? total { get; set; }
    public double? credito { get; set; }
    public double? pagoTotalSemanal { get; set; }
    public double? baseInicial { get; set; }
    public double? ahorroSemanal { get; set; }
    public bool pagoComision {  get; set; }
    public bool ahorroPagado {  get; set; }
    public string? comentario {  get; set; }
  }
}
