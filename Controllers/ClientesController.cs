using MicroFinanciera.Data;
using MicroFinanciera.Models;
using MicroFinanciera.Models.m;
using MicroFinanciera.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace MicroFinanciera.Controllers
{
    public class ClientesController : Controller
    {
        public readonly Context _context;
        private readonly IWebHostEnvironment _env;
        public ClientesController(Context context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _env = hostingEnvironment;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Simulador()
        {
            return View();
        }
        public IActionResult SaveClientes(string request, string request2, string request3)
        {
            Response<object> _res = new Response<object>();
            _res.ok = false;
            _res.message = "An internal error occurred.";
            _res.title = "";
            QryClient qry = new QryClient();
            try
            {
                Clientes item = JsonConvert.DeserializeObject<Clientes>(request);
                Domicilio item2 = JsonConvert.DeserializeObject<Domicilio>(request2);
                Empleo item3 = JsonConvert.DeserializeObject<Empleo>(request3);
                var _new = false;
                Clientes _item = _context.Clientes.Find(item.Id);
                if (_item == null)
                    _new = true;

                if (_new)
                    _item = new Clientes();

                _item.Nombre = item.Nombre;
                _item.Apellido1 = item.Apellido1;
                _item.Apellido2 = item.Apellido2;
                _item.FechaInicio = item.FechaInicio;
                _item.Credito = item.Credito;
                _item.BaseInicial = item.BaseInicial;
                _item.PagoTotalSemanal = item.PagoTotalSemanal;
                _item.AhorroSemanal = item.AhorroSemanal;
                _item.MetodoDePagoId = item.MetodoDePagoId;
                _item.Telefono = item.Telefono;
                _item.Aval = item.Aval;
                _item.TelefonoAval = item.TelefonoAval;
                _item.StatusId = 1;
                _item.Solicitud = item.Solicitud;
                _item.CreditoId = item.CreditoId;

                _item.Telefono2 = item.Telefono2;
                _item.TelefonoAval2 = item.TelefonoAval2;
                _item.DomicilioCasa = item.DomicilioCasa;
                _item.MedidasCasa = item.MedidasCasa;
                _item.DescripcionCasa = item.DescripcionCasa;
                _item.MarcaCarro = item.MarcaCarro;
                _item.ModeloCarro = item.ModeloCarro;
                _item.ColorCarro = item.ColorCarro;
                _item.KilometrajeCarro = item.KilometrajeCarro;
                _item.PlacasCarro = item.PlacasCarro;
                _item.UbicacionTerreno = item.UbicacionTerreno;
                _item.DimencionTerreno = item.DimencionTerreno;
                _item.MarcaMoto = item.MarcaMoto;
                _item.ModeloMoto = item.ModeloMoto;
                _item.ColorMoto = item.ColorMoto;
                _item.KilometrajeMoto = item.KilometrajeMoto;
                _item.PlacasMoto = item.PlacasMoto;
                _item.DescripcionOtro = item.DescripcionOtro;
                _item.GarantiaId = item.GarantiaId;
                _item.FechaNacimiento = item.FechaNacimiento;
                _item.Nacionalidad = item.Nacionalidad;
                _item.GeneroId = item.GeneroId;
                _item.Pais = item.Pais;
                _item.EstadoCivil = item.EstadoCivil;
                _item.DomicilioAval = item.DomicilioAval;

                if (_new)
                {
                    _item.UsuarioRegistraId = SessionHelper.GetObjectFromJson<Auth>(HttpContext.Session, "auth").userID;
                    _context.Clientes.Add(_item);
                    _item.FechaRegistro = DateTime.Now;
                    _item.FechaModificacion = DateTime.Now;
                }
                else
                {
                    _item.FechaModificacion = DateTime.Now;
                    _item.Id = item.Id;
                    _context.Entry(_item).State = EntityState.Modified;
                }
                _context.SaveChanges();
                if (_res.data != null)
                {
                    if (_item.Solicitud == 0)
                    {

                        if (_item.Id == 0 || _item.Id == null)
                        {
                            var client = _context.vmCatalagosAux.FromSqlRaw(qry.getClinetPorName, _item.Id).FirstOrDefault();
                            var detalle = _context.vmCatalagos.FromSqlRaw(qry.getInsertaDetalleSemanal, client.id, client.fecha, _item.CreditoId).ToList();

                        }
                        else
                        {
                            var client = _context.vmCatalagosAux.FromSqlRaw(qry.getClinetID, _item.Id).FirstOrDefault();
                            var detalle = _context.vmCatalagos.FromSqlRaw(qry.getInsertaDetalleSemanal, client.id, client.fecha, _item.CreditoId).ToList();

                        }
                    }
                    else
                    {
                        var client2 = _context.vmCatalagosAux.FromSqlRaw(qry.getClinetPorName, _item.Nombre, _item.Apellido1, _item.Apellido2).FirstOrDefault();
                        var domicilio = _context.vmCatalagos.FromSqlRaw(qry.updatedomicilio,
                         item2.TipoPropiedad,
                         item2.domicilio,
                         item2.Colonia,
                         item2.DelegacionMunicipio,
                         item2.Poblacion,
                         item2.Estado,
                         item2.Pais,
                         item2.CodigoPostal,
                         item2.AniosResidencia,
                         item2.DomicilioAnterior,
                         item2.ColoniaAnterior,
                         item2.DelegacionMunicipioAnterior,
                         client2.id // Asegúrate de que tienes el Id que quieres actualizar
                     ).ToList();
                        var empleo = _context.vmCatalagos.FromSqlRaw(qry.updateEmpleo,
                        item3.Empresa,
                        item3.GiroNegocio,
                        item3.Ocupacion,
                        item3.FechaIngreso,
                        item3.SueldoMensual,
                        item3.FuenteOtrosIngresos,

                        client2.id // Asegúrate de que tienes el Id que quieres actualizar
                    ).ToList();

                    }

                    _res.ok = true;
                    _res.message = "succesfuly";
                    _res.title = "";
                }
            }
            catch (Exception ex)
            {
                _res.ok = false;
                _res.message = _res.message + " : " + ex.Message;
            }
            return Json(_res);
        }

        public IActionResult AprobarClientes(string request)
        {
            Response<object> _res = new Response<object>();
            _res.ok = false;
            _res.message = "An internal error occurred.";
            _res.title = "";

            try
            {
                Clientes item = JsonConvert.DeserializeObject<Clientes>(request);
                var _new = false;
                Clientes _item = _context.Clientes.Find(item.Id);
                if (_item == null)
                    _new = true;

                if (_item != null)
                {
                    _item.Solicitud = 0;
                    _item.CreditoId = 1;
                }

                if (_new)
                {
                    _item.UsuarioRegistraId = SessionHelper.GetObjectFromJson<Auth>(HttpContext.Session, "auth").userID;
                    _context.Clientes.Add(_item);
                    _item.FechaRegistro = DateTime.Now;
                    _item.FechaModificacion = DateTime.Now;
                }
                else
                {
                    _item.FechaModificacion = DateTime.Now;
                    _item.Id = item.Id;
                    _context.Entry(_item).State = EntityState.Modified;
                }
                _context.SaveChanges();
                if (_res.data != null)
                {
                    if (_item.Solicitud == 0)
                    {
                        QryClient qry = new QryClient();
                        var client = _context.vmCatalagosAux.FromSqlRaw(qry.getClinetPorName, _item.Nombre, _item.Apellido1, _item.Apellido2).FirstOrDefault();
                        var detalle = _context.vmCatalagos.FromSqlRaw(qry.getInsertaDetalleSemanal, client.id, client.fecha, _item.CreditoId).ToList();
                    }

                    _res.ok = true;
                    _res.message = "succesfuly";
                    _res.title = "";
                }
            }
            catch (Exception ex)
            {
                _res.ok = false;
                _res.message = _res.message + " : " + ex.Message;
            }
            return Json(_res);
        }
        public IActionResult EliminarSolicitud(string request)
        {
            Response<object> _res = new Response<object>();
            _res.ok = false;
            _res.message = "An internal error occurred.";
            _res.title = "";

            try
            {
                Clientes item = JsonConvert.DeserializeObject<Clientes>(request);
                var _new = false;
                Clientes _item = _context.Clientes.Find(item.Id);

                _res.data = _context.vmCatalagos.FromSqlRaw("delete from Clientes where id = {0};  select 1 as id, '' as name", item.Id).ToList();

                if (_res.data != null)
                {

                    _res.ok = true;
                    _res.message = "succesfuly";
                    _res.title = "";
                }
            }
            catch (Exception ex)
            {
                _res.ok = false;
                _res.message = _res.message + " : " + ex.Message;
            }
            return Json(_res);
        }
        public IActionResult GETClientes(int type)
        {
            Response<object> _res = new Response<object>();
            _res.ok = false;
            _res.message = "An internal error occurred.";
            _res.title = "";
            QryClient qry = new QryClient();
            try
            {
                _res.data = _context.vmClientes.FromSqlRaw(qry.getClientsSolicitud, type).ToList();

                if (_res.data != null)
                {
                    _res.ok = true;
                    _res.message = "";
                    _res.title = "";
                }
            }
            catch (Exception ex)
            {
                _res.ok = false;
                _res.message = ex.Message;
            }
            return Json(_res);
        }
        public IActionResult SaveRenovacion(int id, int clientId, float credito, string fechaInicial, float baseInicial, float ahorroSemanal, float pagoTotalSemnal, float metodoPago, string FechaFinalizaCreditoAnterior, string fechaSolicitud, bool ahorroParaBase)
        {
            Response<object> _res = new Response<object>();
            _res.ok = false;
            _res.message = "An internal error occurred.";
            _res.title = "";
            QryClient qry = new QryClient();
            try
            {
                _res.data = _context.vmCatalagos.FromSqlRaw(qry.SaveRenovaciones, id, clientId, credito, fechaInicial, baseInicial, ahorroSemanal, pagoTotalSemnal, metodoPago, FechaFinalizaCreditoAnterior, fechaSolicitud, ahorroParaBase).ToList();

                if (_res.data != null)
                {
                    _res.ok = true;
                    _res.message = "";
                    _res.title = "";
                }
            }
            catch (Exception ex)
            {
                _res.ok = false;
                _res.message = ex.Message;
            }
            return Json(_res);
        }
        public IActionResult GETClientesRenovacion(int id)
        {
            Response<object> _res = new Response<object>();
            _res.ok = false;
            _res.message = "An internal error occurred.";
            _res.title = "";
            QryClient qry = new QryClient();
            try
            {
                _res.data = _context.vmClientesRenovacion.FromSqlRaw(qry.getClinetesRenovacion, id).ToList();

                if (_res.data != null)
                {
                    _res.ok = true;
                    _res.message = "";
                    _res.title = "";
                }
            }
            catch (Exception ex)
            {
                _res.ok = false;
                _res.message = ex.Message;
            }
            return Json(_res);
        }
        public IActionResult DeleteClientesRenovacion(int id, int creditoId, int ClienteId)
        {
            Response<object> _res = new Response<object>();
            _res.ok = false;
            _res.message = "An internal error occurred.";
            _res.title = "";
            QryClient qry = new QryClient();
            try
            {
                _res.data = _context.vmCatalagos.FromSqlRaw(qry.DeleteRenovaciones, id, creditoId, ClienteId).ToList();

                if (_res.data != null)
                {
                    _res.ok = true;
                    _res.message = "";
                    _res.title = "";
                }
            }
            catch (Exception ex)
            {
                _res.ok = false;
                _res.message = ex.Message;
            }
            return Json(_res);
        }
        public IActionResult SaveRenovacionDetalleSemanas(int id, int clientId, string fechaInicial)
        {
            Response<object> _res = new Response<object>();
            _res.ok = false;
            _res.message = "An internal error occurred.";
            _res.title = "";
            QryClient qry = new QryClient();
            try
            {
                _res.data = _context.vmCatalagos.FromSqlRaw(qry.AprobarRenovaciones, id, clientId, fechaInicial).ToList();

                if (_res.data != null)
                {
                    _res.ok = true;
                    _res.message = "";
                    _res.title = "";
                }
            }
            catch (Exception ex)
            {
                _res.ok = false;
                _res.message = ex.Message;
            }
            return Json(_res);
        }
        public IActionResult GetGarantia()
        {
            Response<object> _res = new Response<object>();
            _res.ok = false;
            _res.message = "An internal error occurred.";
            _res.title = "";
            QryClient qry = new QryClient();
            try
            {
                _res.data = _context.vmCatalagos.FromSqlRaw(qry.getGarantias).ToList();

                if (_res.data != null)
                {
                    _res.ok = true;
                    _res.message = "";
                    _res.title = "";
                }
            }
            catch (Exception ex)
            {
                _res.ok = false;
                _res.message = ex.Message;
            }
            return Json(_res);
        }
        public IActionResult GetGenero()
        {
            Response<object> _res = new Response<object>();
            _res.ok = false;
            _res.message = "An internal error occurred.";
            _res.title = "";
            QryClient qry = new QryClient();
            try
            {
                _res.data = _context.vmCatalagos.FromSqlRaw(qry.getGenero).ToList();

                if (_res.data != null)
                {
                    _res.ok = true;
                    _res.message = "";
                    _res.title = "";
                }
            }
            catch (Exception ex)
            {
                _res.ok = false;
                _res.message = ex.Message;
            }
            return Json(_res);
        }
    }
}
