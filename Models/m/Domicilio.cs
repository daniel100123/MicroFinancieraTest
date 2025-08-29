namespace MicroFinanciera.Models.m
{
  public class Domicilio
  {
    public int? Id { get; set; } // Asumiendo que hay un Id como clave primaria
    public string? TipoPropiedad { get; set; } // Tipo de propiedad: Propia, Rentada, etc.
    public string? domicilio { get; set; } // Domicilio (Calle y número exterior e interior)
    public string? Colonia { get; set; }
    public string? DelegacionMunicipio { get; set; } // Delegación o Municipio
    public string? Poblacion { get; set; }
    public string? Estado { get; set; }
    public string? Pais { get; set; }
    public string? CodigoPostal { get; set; }
    public int? AniosResidencia { get; set; } // Permitir valores nulos si no se especifica

    // Domicilio anterior
    public string? DomicilioAnterior { get; set; } // Tipo de propiedad: Propia, Rentada, etc.

    public string? CalleAnterior { get; set; } // Calle del domicilio anterior
    public string? ColoniaAnterior { get; set; }
    public string? DelegacionMunicipioAnterior { get; set; }
    public string? PoblacionAnterior { get; set; }
    public string? EstadoAnterior { get; set; }
    public string? PaisAnterior { get; set; }
    public string? CodigoPostalAnterior { get; set; }
    public int? AniosResidenciaAnterior { get; set; } // Años de residencia anterior
  }

}
