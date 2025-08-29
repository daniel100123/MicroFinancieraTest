namespace MicroFinanciera.Models
{
  public class vmClientes
  {
    public int id { get; set; }
    public string? nombres { get; set; }
    public string? nombre { get; set; }
    public string? apellido1 { get; set; }
    public string? apellido2 { get; set; }
    public string? fechaInicio { get; set; }
    public string? fechaSolicitud { get; set; }
    public double? credito { get; set; }
    public double? baseInicial { get; set; }
    public double? ahorroSemanal { get; set; }
    public double? pagoTotalSemanal { get; set; }
    public string? diaPago { get; set; }
    public int statusId { get; set; }
    public string? fechaRegistro { get; set; }
    public int? metodoDePagoId { get; set; }
    public int? generoId { get; set; }
    public string? genero { get; set; }
    public string? telefono { get; set; }
    public string? fechaNacimiento { get; set; }
    public string? pais { get; set; }
    public string? nacionalidad { get; set; }
    public string? estadoCivil { get; set; }
    public string? aval { get; set; }
    public string? domicilioAval { get; set; }
    public string? telefonoAval { get; set; }
    public string? telefono2 { get; set; }
    public string? telefonoAval2 { get; set; }
    public string? domicilioCasa { get; set; }
    public string? medidasCasa { get; set; }
    public string? descripcionCasa { get; set; }
    public string? marcaCarro { get; set; }
    public string? modeloCarro { get; set; }
    public string? colorCarro { get; set; }
    public string? kilometrajeCarro { get; set; }
    public string? placasCarro { get; set; }
    public string? ubicacionTerreno { get; set; }
    public string? dimensionTerreno { get; set; }
    public string? marcaMoto { get; set; }
    public string? modeloMoto { get; set; }
    public string? colorMoto { get; set; }
    public string? kilometrajeMoto { get; set; }
    public string? placasMoto { get; set; }
    public string? descripcionOtro { get; set; }
    public int? garantiaId { get; set; }

    // Domicilio fields
    public string? tipoPropiedad { get; set; }
    public string? domicilio { get; set; }
    public string? colonia { get; set; }
    public string? delegacionMunicipio { get; set; }
    public string? poblacion { get; set; }
    public string? estado { get; set; }
    public string? paisDomicilio { get; set; }
    public string? codigoPostal { get; set; }
    public int? aniosResidencia { get; set; }
    public string? domicilioAnterior { get; set; }
    public string? coloniaAnterior { get; set; }
    public string? delegacionMunicipioAnterior { get; set; }

    // Empleo fields
    public string? empresa { get; set; }
    public string? giroNegocio { get; set; }
    public string? ocupacion { get; set; }
    public string? fechaIngreso { get; set; }
    public decimal sueldo { get; set; }
    public string? fuenteOtrosIngresos { get; set; }
  }


  public class vmClientesRenovacion
  {
    public int id { get; set; }
    public int clienteId { get; set; }
    public string? nombres { get; set; }
    public string? fechaInicio { get; set; }
    public double credito { get; set; }
    public double baseInicial { get; set; }
    public double ahorroSemanal { get; set; }
    public double pagoTotalSemanal { get; set; }
    public string? diaPago { get; set; }
    public int statusId { get; set; }
    public int metodoDePagoId { get; set; }
    public int creditoId { get; set; }
    public string? fechaFinalizaCreditoAnterior { get; set; }
    public string? fechaSolicitud { get; set; }
  }
}
