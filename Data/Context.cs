using Microsoft.EntityFrameworkCore;

namespace MicroFinanciera.Data
{
  public class Context: DbContext
  {
    public Context(DbContextOptions<Context> options)
   : base(options)
    {
    }

    #region m
    public virtual DbSet<MicroFinanciera.Models.Usuarios> Usuarios { get; set; }
    public virtual DbSet<MicroFinanciera.Models.Access> Access { get; set; }
    public virtual DbSet<MicroFinanciera.Models.Clientes> Clientes { get; set; }

    #endregion

    #region vm
    public virtual DbSet<MicroFinanciera.Models.vmModuleDetail> vmModuleDetail { get; set; }
    public virtual DbSet<MicroFinanciera.Models.vmClientes> vmClientes { get; set; }
    public virtual DbSet<MicroFinanciera.Models.vmCatalagos> vmCatalagos { get; set; }
    public virtual DbSet<MicroFinanciera.Models.vmCatalagosAux> vmCatalagosAux { get; set; }
    public virtual DbSet<MicroFinanciera.Models.vmDetalleSemanalCliente> vmDetalleSemanalCliente { get; set; }
    public virtual DbSet<MicroFinanciera.Models.vmReporteSemanal> vmReporteSemanal { get; set; }
    public virtual DbSet<MicroFinanciera.Models.vmDeudores> vmDeudores { get; set; }
    public virtual DbSet<MicroFinanciera.Models.vmDeudoresDetails> vmDeudoresDetails { get; set; }
    public virtual DbSet<MicroFinanciera.Models.vmTicket> vmTicket { get; set; }
    public virtual DbSet<MicroFinanciera.Models.vmClientesRenovacion> vmClientesRenovacion { get; set; }

    #endregion
  }
}
