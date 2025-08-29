namespace MicroFinanciera.Models
{
  public class vmReporteSemanal
  {
    public int? id { get; set; }
    public string? cliente { get; set; }
    public string? fechaPago { get; set; }
    public string? semana { get; set; }
    public double? cantidadPagada { get; set; }
    public double? comision { get; set; }
    public bool? pagoComision {  get; set; }
    public double? total { get; set; }
    public double? pagoSemanal { get; set; }
    public double? credito { get; set; }
    public double? ahorro { get; set; }
    public string? metodoPago { get; set; }
    public string? diaPago { get; set; }
    public int? creditoId { get; set; }
    public string? dia { get; set; }
    public string? fechaPagoRealizada { get; set; }
  }
}
