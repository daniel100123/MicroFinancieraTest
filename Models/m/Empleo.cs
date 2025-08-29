namespace MicroFinanciera.Models.m
{
  public class Empleo
  {
    public int Id { get; set; } // Clave primaria
    public string? Empresa { get; set; } // Empresa donde trabaja
    public string? GiroNegocio { get; set; } // Actividad o giro del negocio
    public string? Ocupacion { get; set; } // Ocupación actual
    public DateTime? FechaIngreso { get; set; } // Fecha de ingreso
    public decimal? SueldoMensual { get; set; } // Sueldo mensual
    public string? FuenteOtrosIngresos { get; set; } // Fuente de otros ingresos, opcional
    public string? NombreJefeInmediato { get; set; } // Nombre del jefe inmediato, opcional
    public string? TelefonoOficina { get; set; } // Teléfono de la oficina, opcional
    public string? TelefonoOtro { get; set; } // Otro teléfono de contacto, opcional
    public string? DomicilioLaboral { get; set; } // Domicilio laboral completo

    // Empleo anterior
    public string? EmpresaAnterior { get; set; } // Empresa anterior
    public string? GiroNegocioAnterior { get; set; } // Actividad o giro del negocio anterior
    public string? OcupacionAnterior { get; set; } // Ocupación en la empresa anterior
    public DateTime? FechaIngresoAnterior { get; set; } // Fecha de ingreso en el empleo anterior
    public decimal? SueldoAnterior { get; set; } // Sueldo en el empleo anterior
    public string? FuenteOtrosIngresosAnterior { get; set; } // Fuente de otros ingresos anterior
  }

}
