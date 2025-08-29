namespace MicroFinanciera.Models
{
  public class Clientes
  {
    public int Id { get; set; }
    public string? Nombre { get; set; }
    public string? Apellido1 { get; set; }
    public string? Apellido2 { get; set; }
    public DateTime? FechaInicio { get; set; }
    public DateTime? FechaSolicitud { get; set; }
    public double? Credito { get; set; }
    public double? BaseInicial { get; set; }
    public double? AhorroSemanal { get; set; }
    public double? PagoTotalSemanal { get; set; }
    public int? StatusId { get; set; }
    public DateTime? FechaRegistro { get; set; }
    public DateTime? FechaModificacion { get; set; }
    public DateTime? FechaNacimiento { get; set; }
    public int? UsuarioRegistraId { get; set; }
    public int? MetodoDePagoId { get; set; }
    public string? Telefono { get; set; }
    public string? Domicilio { get; set; }
    public string? Aval { get; set; }
    public string? TelefonoAval { get; set; }
    public string? IdCliente { get; set; }
    public string? Pais { get; set; }
    public string? Nacionalidad { get; set; }
    public string? EstadoCivil { get; set; }
    public string? DomicilioAval { get; set; }
    public int? Solicitud { get; set; }
    public int? CreditoId { get; set; }
    public int? Finalizado { get; set; }
    public string? Telefono2 { get; set; }
    public string? TelefonoAval2 { get; set; }
    public string? DomicilioCasa { get; set; }
    public string? MedidasCasa { get; set; }
    public string? DescripcionCasa { get; set; }
    public string? MarcaCarro { get; set; }
    public string? ModeloCarro { get; set; }
    public string? ColorCarro { get; set; }
    public string? KilometrajeCarro { get; set; }
    public string? PlacasCarro { get; set; }
    public string? UbicacionTerreno { get; set; }
    public string? DimencionTerreno { get; set; }
    public string? MarcaMoto { get; set; }
    public string? ModeloMoto { get; set; }
    public string? ColorMoto { get; set; }
    public string? KilometrajeMoto { get; set; }
    public string? PlacasMoto { get; set; }
    public string? DescripcionOtro { get; set; }
    public string? Negocio { get; set; }
    public string? UbicacionNegocio { get; set; }
    public string? TiempoNegocio { get; set; }
    public int? GarantiaId { get; set; }
    public int? GeneroId { get; set; }
  }
}
