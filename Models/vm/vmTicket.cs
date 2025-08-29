namespace MicroFinanciera.Models
{
    public class vmTicket
    {
    public int id { get; set; }
    public string? cliente { get; set; }
    public double pagoTotalSemanal { get; set; }
    public double pagoRealizado { get; set; }
    public string? fechaPago { get; set; }
    public string? fechaRealiza { get; set; }
    public string? semana { get; set; }
    public int pagosPendientes { get; set; }
    public double credito { get; set; }
    public string? metodoPago { get; set; }
    public double comision {  get; set; }
    public string? fechaInicio {  get; set; }
    public int creditoId {  get; set; }
    public double ahorroSemanal { get; set; }
    public double ahorroTotal { get; set; }
    public double baseInicial { get; set; }
    public string? idCliente { get; set; }
    }
}
