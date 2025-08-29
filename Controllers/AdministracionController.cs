using MicroFinanciera.Data;
using MicroFinanciera.Models;
using MicroFinanciera.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System.Text;

namespace MicroFinanciera.Controllers
{
  public class AdministracionController : Controller
  {
    public readonly Context _context;
    private readonly IWebHostEnvironment _env;
    public AdministracionController(Context context, IWebHostEnvironment hostingEnvironment)
    {
      _context = context;
      _env = hostingEnvironment;
    }
    public IActionResult PagosSemanales()
    {
      return View();
    }
    public IActionResult ReporteSemanal()
    {
      return View();
    }
    public IActionResult ReporteDiario()
    {
      return View();
    }
    public IActionResult ReporteGeneral() { 
     return View();
    }
    public IActionResult Deudores()
    {
      return View();
    }
    public IActionResult HistorialdePagosPorCliente()
    {
      return View();
    }
    public IActionResult SolicitudCredito()
    {
      return View();
    }
    public IActionResult renovacion()
    {
      return View();
    }
    public IActionResult RegistroDiario()
    {
      return View();
    }
    public IActionResult RegistroSemanal()
    {
      return View();
    }
    public IActionResult RegistroGeneral()
    {
      return View();
    }
    public IActionResult RenovacionesAprobadas()
    {
      return View();
    }
    public IActionResult GETClientes()
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.message = "An internal error occurred.";
      _res.title = "";
      QryClient qry = new QryClient();
      try
      {
        _res.data = _context.vmCatalagos.FromSqlRaw(qry.getClientsCatalago).ToList();
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
    public IActionResult GETCreditoCatalago(int clienteId)
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.message = "An internal error occurred.";
      _res.title = "";
      QryClient qry = new QryClient();
      try
      {
        _res.data = _context.vmCatalagos.FromSqlRaw(qry.getCreditosCatalago,clienteId).ToList();
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
    public IActionResult GETDetalleSemanalCliente(string fecha, int clientId,int creditoId)
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.message = "An internal error occurred.";
      _res.title = "";
      QryClient qry = new QryClient();
      try
      {
          _res.data = _context.vmDetalleSemanalCliente.FromSqlRaw(qry.getDetalleSemanalClientes, fecha, clientId, creditoId).ToList();

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
    public IActionResult SavePago(int clientId,double pago,string fecha,int semana,int metodoDePagoId,bool pagoComision,int creditoId,string comentario,bool ahorroPagado)
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.message = "An internal error occurred.";
      _res.title = "";
      QryClient qry = new QryClient();
      try
      {
        _res.data = _context.vmCatalagos.FromSqlRaw(qry.savePago, clientId,pago,fecha,semana, metodoDePagoId, pagoComision, creditoId, comentario, ahorroPagado).ToList();
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
    public IActionResult GETMetodopago()
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.message = "An internal error occurred.";
      _res.title = "";
      QryClient qry = new QryClient();
      try
      {
        _res.data = _context.vmCatalagos.FromSqlRaw(qry.getMetodoPago).ToList();
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
    public IActionResult GetDetalleSemanal(string fechaI, string fechaF, int clientId,int creditoId)
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.message = "An internal error occurred.";
      _res.title = "";
      QryClient qry = new QryClient();
      try
      {
        _res.data = _context.vmReporteSemanal.FromSqlRaw(qry.getReporteSemanal, fechaI, fechaF, clientId,creditoId).ToList();
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
    public IActionResult GetDetalleSemanalReportes(string fechaI, string fechaF, int clientId, int creditoId) 
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.message = "An internal error occurred.";
      _res.title = "";
      QryClient qry = new QryClient();
      try
      {
        _res.data = _context.vmReporteSemanal.FromSqlRaw(qry.getReporteSemanal2, fechaI, fechaF, clientId, creditoId).ToList();
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
    public IActionResult GETClientesDeudores(string dia)
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.message = "An internal error occurred.";
      _res.title = "";
      QryClient qry = new QryClient();
      try
      {
        _res.data = _context.vmCatalagos.FromSqlRaw(qry.getClientsDeudores,dia).ToList();
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
    public IActionResult GETClientesDeudoresList(string dia,int clientId)
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.message = "An internal error occurred.";
      _res.title = "";
      QryClient qry = new QryClient();
      try
      {
        _res.data = _context.vmDeudores.FromSqlRaw(qry.getListDeudores, dia, clientId).ToList();
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

    public IActionResult GETDeudores(string dia)
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.message = "An internal error occurred.";
      _res.title = "";
      QryClient qry = new QryClient();
      int truena = 0;
      try
      {
        var _deudores = _context.vmDeudores.FromSqlRaw(qry.getDeudores,dia).ToList();
        foreach (vmDeudores deudor in _deudores)
        {
          truena = deudor.id;
          deudor.detail = _context.vmDeudoresDetails.FromSqlRaw(String.Format(qry.getDeudoresDetails, dia,deudor.id,deudor.creditoId)).ToList();
          int dias = 0;
         
          foreach (vmDeudoresDetails deudorDetail in deudor.detail)
          {
            dias = (int)(dias + deudorDetail.dias);
          }
          if (deudor.detail != null && deudor.detail.Count > 0)
          {
            deudor.comision = dias * deudor.detail[0].comision;
          }
        
          dias = 0;
        }
        _res.data = _deudores;
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
        _res.message = ex.Message + truena;
      }
      return Json(_res);
    }
    public IActionResult UpdatePago(int id)
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.message = "An internal error occurred.";
      _res.title = "";
      QryClient qry = new QryClient();
      try
      {
        _res.data = _context.vmCatalagos.FromSqlRaw(qry.updatePago, id).ToList();
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

    //excel
    public ActionResult GetExcelClient(string fecha, int clientId, int creditoId)
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.title = "";
      ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
      List<vmDetalleSemanalCliente> item = new List<vmDetalleSemanalCliente>();
      QryClient qry = new QryClient();
      try
      {
        item = _context.vmDetalleSemanalCliente.FromSqlRaw(qry.getDetalleSemanalClientes, fecha, clientId, creditoId).ToList();
        if (item.Count != 0)
        {
          // Crear un nuevo archivo de Excel en memoria
          using (var package = new ExcelPackage())
          {
            // Crear la primera hoja de trabajo
            var hojaTrabajo1 = package.Workbook.Worksheets.Add(item[0].nombre);
            // Establecer el estilo del encabezado de la primera hoja
            var style1 = hojaTrabajo1.Cells["A8:I8"].Style;
            style1.Font.Bold = true;
            style1.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center; // Centrar el texto
            style1.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin); // Bordes para el encabezado
            style1.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin); // Bordes para el encabezado

            hojaTrabajo1.Cells["A1:I1"].Merge = true;
            hojaTrabajo1.Cells["A1:I1"].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            hojaTrabajo1.Cells["A1:I1"].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.White); // Fondo blanco
            hojaTrabajo1.Cells["A1:I1"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            hojaTrabajo1.Cells["A1:I1"].Style.Font.Bold = true;
            hojaTrabajo1.Cells["A1:I1"].Value = "MICROFINANCIERA";

            hojaTrabajo1.Cells["A2:I2"].Merge = true;
            hojaTrabajo1.Cells["A2:I2"].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            hojaTrabajo1.Cells["A2:I2"].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.White); // Fondo blanco
            //hojaTrabajo1.Cells["A2:I2"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            hojaTrabajo1.Cells["A2:I2"].Style.Font.Bold = true;
            hojaTrabajo1.Cells["A2:I2"].Value = "Cliente: "+ item[0].nombre;

            hojaTrabajo1.Cells["A3:I3"].Merge = true;
            hojaTrabajo1.Cells["A3:I3"].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            hojaTrabajo1.Cells["A3:I3"].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.White); // Fondo blanco
            // hojaTrabajo1.Cells["A3:I3"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            hojaTrabajo1.Cells["A3:I3"].Style.Font.Bold = true;
            hojaTrabajo1.Cells["A3:I3"].Value = "Credito: " + String.Format("${0:n}", item[0].credito);

            hojaTrabajo1.Cells["A4:I4"].Merge = true;
            hojaTrabajo1.Cells["A4:I4"].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            hojaTrabajo1.Cells["A4:I4"].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.White); // Fondo blanco
             // hojaTrabajo1.Cells["A4:I4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            hojaTrabajo1.Cells["A4:I4"].Style.Font.Bold = true;
            hojaTrabajo1.Cells["A4:I4"].Value = "Base Inicial: " + String.Format("${0:n}", item[0].baseInicial) ;

            hojaTrabajo1.Cells["A5:I5"].Merge = true;
            hojaTrabajo1.Cells["A5:I5"].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            hojaTrabajo1.Cells["A5:I5"].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.White); // Fondo blanco
             // hojaTrabajo1.Cells["A5:I5"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            hojaTrabajo1.Cells["A5:I5"].Style.Font.Bold = true;
            hojaTrabajo1.Cells["A5:I5"].Value = "Ahorro Semanal: " + String.Format("${0:n}", item[0].ahorroSemanal);

            hojaTrabajo1.Cells["A6:I6"].Merge = true;
            hojaTrabajo1.Cells["A6:I6"].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            hojaTrabajo1.Cells["A6:I6"].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.White); // Fondo blanco
            // hojaTrabajo1.Cells["A6:I6"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            hojaTrabajo1.Cells["A6:I6"].Style.Font.Bold = true;
            hojaTrabajo1.Cells["A6:I6"].Value = "Pago Total Semanal: " + String.Format("${0:n}", item[0].pagoTotalSemanal);

            // Agregar encabezados a la primera hoja
            hojaTrabajo1.Cells["A8"].Value = "SEMANA";
            hojaTrabajo1.Cells["B8"].Value = "FECHA DE PAGO";
            hojaTrabajo1.Cells["C8"].Value = "FECHA REALIZADA";
            hojaTrabajo1.Cells["D8"].Value = "AHORRO SEMANAL";
            hojaTrabajo1.Cells["E8"].Value = "COMISION";
            hojaTrabajo1.Cells["F8"].Value = "COMISION PAGADA";
            hojaTrabajo1.Cells["G8"].Value = "CANTIDAD PAGADA";
            hojaTrabajo1.Cells["H8"].Value = "TOTAL A PAGAR";
            hojaTrabajo1.Cells["I8"].Value = "COMENTARIO";

            // Agregar datos a las celdas de la primera hoja
            int fila1 = 9;
            foreach (var datos in item)
            {
              hojaTrabajo1.Cells["A" + fila1].Value = datos.semana;
              hojaTrabajo1.Cells["B" + fila1].Value = datos.fechaPago;
              hojaTrabajo1.Cells["C" + fila1].Value = datos.fechaRealizada;
              hojaTrabajo1.Cells["D" + fila1].Value = String.Format("${0:n}", datos.ahorroSemanal);
              hojaTrabajo1.Cells["E" + fila1].Value = String.Format("${0:n}", datos.comision);
              hojaTrabajo1.Cells["F" + fila1].Value = datos.pagoComision ? "SI" : "NO";
              hojaTrabajo1.Cells["G" + fila1].Value = String.Format("${0:n}", datos.cantidadPagada);
              hojaTrabajo1.Cells["H" + fila1].Value = String.Format("${0:n}", datos.pagoTotalSemanal + datos.comision);
              hojaTrabajo1.Cells["I" + fila1].Value = datos.comentario;

              var celdaRango = hojaTrabajo1.Cells[$"A{fila1}:I{fila1}"];
              celdaRango.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center; // Centrar texto
              celdaRango.Style.Border.Top.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
              celdaRango.Style.Border.Bottom.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
              celdaRango.Style.Border.Left.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
              celdaRango.Style.Border.Right.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;

              fila1++;
            }

            // Ajustar el ancho de las columnas automáticamente
            hojaTrabajo1.Cells[hojaTrabajo1.Dimension.Address].AutoFitColumns();

            // Convertir el paquete de Excel a un arreglo de bytes
            byte[] bytes = package.GetAsByteArray();

            // Convertir los bytes a una cadena Base64
            string base64String = Convert.ToBase64String(bytes);

            // Asignar la cadena Base64 a la propiedad message de la respuesta _res
            _res.message = base64String;

            // Establecer las propiedades para la respuesta
            _res.ok = true;
            _res.title = "";
          }
        }
        else
        {
          _res.message = "No Data";
        }
      }
      catch (Exception ex)
      {
        _res.ok = false;
        _res.message = ex.Message;
      }

      return Json(_res);
    }

    public ActionResult GetExcelRegistroSemanal(string fechaI, string fechaF, int clientId, int creditoId,int type)
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.title = "";
      ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
      List<vmReporteSemanal> item = new List<vmReporteSemanal>();
      QryClient qry = new QryClient();
      try
      {
        item = _context.vmReporteSemanal.FromSqlRaw(qry.getReporteSemanal, fechaI, fechaF, clientId, creditoId).ToList();
        if (item.Count != 0)
        {
          // Crear un nuevo archivo de Excel en memoria
          using (var package = new ExcelPackage())
          {
            var nameHoja = "";
            // Crear la primera hoja de trabajo
            if (type == 1)
            {
              nameHoja = "Registro Semanal Deudores";
            }
            else
            {
              nameHoja = "Registro Semanal";

            }
            var hojaTrabajo1 = package.Workbook.Worksheets.Add(nameHoja);
            // Establecer el estilo del encabezado de la primera hoja
            var style1 = hojaTrabajo1.Cells["A3:M3"].Style;
            style1.Font.Bold = true;
            style1.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center; // Centrar el texto
            style1.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin); // Bordes para el encabezado
            style1.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin); // Bordes para el encabezado
            style1.Border.Right.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
            style1.Border.Left.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
            style1.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            style1.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gold);

            hojaTrabajo1.Cells["A1:M1"].Merge = true;
            hojaTrabajo1.Cells["A1:M1"].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            hojaTrabajo1.Cells["A1:M1"].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gold); // Fondo blanco
            hojaTrabajo1.Cells["A1:M1"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            hojaTrabajo1.Cells["A1:M1"].Style.Font.Bold = true;
            hojaTrabajo1.Cells["A1:M1"].Value = nameHoja + " " + fechaI + "  al "+ fechaF;

           

            // Agregar encabezados a la primera hoja
            hojaTrabajo1.Cells["A3"].Value = "CLIENTE";
            hojaTrabajo1.Cells["B3"].Value = "CREDITO";
            hojaTrabajo1.Cells["C3"].Value = "FECHA A PAGAR";
            hojaTrabajo1.Cells["D3"].Value = "FECHA QUE PAGO";
            hojaTrabajo1.Cells["E3"].Value = "SEMANA";
            hojaTrabajo1.Cells["F3"].Value = "PAGO";
            hojaTrabajo1.Cells["G3"].Value = "COMISION";
            hojaTrabajo1.Cells["H3"].Value = "PAGO SEMANAL";
            hojaTrabajo1.Cells["I3"].Value = "TOTAL";
            hojaTrabajo1.Cells["J3"].Value = "MEDIO";
            hojaTrabajo1.Cells["K3"].Value = "SOLICITUD";
            hojaTrabajo1.Cells["L3"].Value = "PAGADO";
            hojaTrabajo1.Cells["M3"].Value = "DIA";

            // Agregar datos a las celdas de la primera hoja
            int fila1 = 4;
            foreach (var datos in item)
            {
              if(type == 1 && datos.fechaPagoRealizada == "")
              {
                hojaTrabajo1.Cells["A" + fila1].Value = datos.cliente;
                hojaTrabajo1.Cells["B" + fila1].Value = String.Format("${0:n}", datos.credito);
                hojaTrabajo1.Cells["C" + fila1].Value = datos.fechaPago;
                hojaTrabajo1.Cells["D" + fila1].Value = datos.fechaPagoRealizada;
                hojaTrabajo1.Cells["E" + fila1].Value = datos.semana;
                hojaTrabajo1.Cells["F" + fila1].Value = String.Format("${0:n}", datos.cantidadPagada);
                hojaTrabajo1.Cells["G" + fila1].Value = String.Format("${0:n}", datos.comision);
                hojaTrabajo1.Cells["H" + fila1].Value = String.Format("${0:n}", datos.pagoSemanal);
                hojaTrabajo1.Cells["I" + fila1].Value = String.Format("${0:n}", (datos.pagoSemanal + datos.comision));
                hojaTrabajo1.Cells["J" + fila1].Value = datos.metodoPago;
                hojaTrabajo1.Cells["K" + fila1].Value = datos.creditoId;
                hojaTrabajo1.Cells["L" + fila1].Value = datos.cantidadPagada > 0 ? "SI" : "NO";
                hojaTrabajo1.Cells["M" + fila1].Value = datos.dia;

                var celdaRango = hojaTrabajo1.Cells[$"A{fila1}:M{fila1}"];
                celdaRango.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center; // Centrar texto
                celdaRango.Style.Border.Top.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                celdaRango.Style.Border.Bottom.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                celdaRango.Style.Border.Left.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                celdaRango.Style.Border.Right.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                fila1++;
              }
              if (type == 0)
              {
                hojaTrabajo1.Cells["A" + fila1].Value = datos.cliente;
                hojaTrabajo1.Cells["B" + fila1].Value = String.Format("${0:n}", datos.credito);
                hojaTrabajo1.Cells["C" + fila1].Value = datos.fechaPago;
                hojaTrabajo1.Cells["D" + fila1].Value = datos.fechaPagoRealizada;
                hojaTrabajo1.Cells["E" + fila1].Value = datos.semana;
                hojaTrabajo1.Cells["F" + fila1].Value = String.Format("${0:n}", datos.cantidadPagada);
                hojaTrabajo1.Cells["G" + fila1].Value = String.Format("${0:n}", datos.comision);
                hojaTrabajo1.Cells["H" + fila1].Value = String.Format("${0:n}", datos.pagoSemanal);
                hojaTrabajo1.Cells["I" + fila1].Value = String.Format("${0:n}", (datos.pagoSemanal + datos.comision));
                hojaTrabajo1.Cells["J" + fila1].Value = datos.metodoPago;
                hojaTrabajo1.Cells["K" + fila1].Value = datos.creditoId;
                hojaTrabajo1.Cells["L" + fila1].Value = datos.cantidadPagada > 0 ? "SI" : "NO";
                hojaTrabajo1.Cells["M" + fila1].Value = datos.dia;

                var celdaRango = hojaTrabajo1.Cells[$"A{fila1}:M{fila1}"];
                celdaRango.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center; // Centrar texto
                celdaRango.Style.Border.Top.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                celdaRango.Style.Border.Bottom.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                celdaRango.Style.Border.Left.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                celdaRango.Style.Border.Right.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                fila1++;
              }


             

              
            }

            // Ajustar el ancho de las columnas automáticamente
            hojaTrabajo1.Cells[hojaTrabajo1.Dimension.Address].AutoFitColumns();

            // Convertir el paquete de Excel a un arreglo de bytes
            byte[] bytes = package.GetAsByteArray();

            // Convertir los bytes a una cadena Base64
            string base64String = Convert.ToBase64String(bytes);

            // Asignar la cadena Base64 a la propiedad message de la respuesta _res
            _res.message = base64String;

            // Establecer las propiedades para la respuesta
            _res.ok = true;
            _res.title = "";
          }
        }
        else
        {
          _res.message = "No Data";
        }
      }
      catch (Exception ex)
      {
        _res.ok = false;
        _res.message = ex.Message;
      }

      return Json(_res);
    }
    public ActionResult GetExcelPagoSemanal(string fechaI, string fechaF, int clientId, int creditoId)
    {
      Response<object> _res = new Response<object>();
      _res.ok = false;
      _res.title = "";
      ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
      List<vmReporteSemanal> item = new List<vmReporteSemanal>();
      QryClient qry = new QryClient();
      try
      {
        item = _context.vmReporteSemanal.FromSqlRaw(qry.getReporteSemanal2, fechaI, fechaF, clientId, creditoId).ToList();
        if (item.Count != 0)
        {
          // Crear un nuevo archivo de Excel en memoria
          using (var package = new ExcelPackage())
          {
            // Crear la primera hoja de trabajo
            var hojaTrabajo1 = package.Workbook.Worksheets.Add("Reporte Semanal");
            // Establecer el estilo del encabezado de la primera hoja
            var style1 = hojaTrabajo1.Cells["A3:H3"].Style;
            style1.Font.Bold = true;
            style1.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center; // Centrar el texto
            style1.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin); // Bordes para el encabezado
            style1.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin); // Bordes para el encabezado
            style1.Border.Right.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
            style1.Border.Left.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
            style1.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            style1.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gold);

            hojaTrabajo1.Cells["A1:H1"].Merge = true;
            hojaTrabajo1.Cells["A1:H1"].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            hojaTrabajo1.Cells["A1:H1"].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gold); // Fondo blanco
            hojaTrabajo1.Cells["A1:H1"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            hojaTrabajo1.Cells["A1:H1"].Style.Font.Bold = true;
            hojaTrabajo1.Cells["A1:H1"].Value = "Reporte Semanal del " + fechaI + "  al " + fechaF;



            // Agregar encabezados a la primera hoja
            hojaTrabajo1.Cells["A3"].Value = "CLIENTE";
            hojaTrabajo1.Cells["B3"].Value = "FECHA QUE PAGO";
            hojaTrabajo1.Cells["C3"].Value = "SEMANA";
            hojaTrabajo1.Cells["D3"].Value = "PAGO";
            hojaTrabajo1.Cells["E3"].Value = "COMISION";
            hojaTrabajo1.Cells["F3"].Value = "TOTAL";
            hojaTrabajo1.Cells["G3"].Value = "MEDIO";
            hojaTrabajo1.Cells["H3"].Value = "DIA";

            // Agregar datos a las celdas de la primera hoja
            int fila1 = 4;
            foreach (var datos in item)
            {
              hojaTrabajo1.Cells["A" + fila1].Value = datos.cliente;
              hojaTrabajo1.Cells["B" + fila1].Value = datos.fechaPagoRealizada;
              hojaTrabajo1.Cells["C" + fila1].Value = datos.semana;
              hojaTrabajo1.Cells["D" + fila1].Value = String.Format("${0:n}", datos.cantidadPagada);
              hojaTrabajo1.Cells["E" + fila1].Value = String.Format("${0:n}", datos.comision);
              hojaTrabajo1.Cells["F" + fila1].Value = String.Format("${0:n}", (datos.pagoSemanal + datos.comision));
              hojaTrabajo1.Cells["G" + fila1].Value = datos.metodoPago;
              hojaTrabajo1.Cells["H" + fila1].Value = datos.dia;

              var celdaRango = hojaTrabajo1.Cells[$"A{fila1}:H{fila1}"];
              celdaRango.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center; // Centrar texto
              celdaRango.Style.Border.Top.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
              celdaRango.Style.Border.Bottom.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
              celdaRango.Style.Border.Left.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
              celdaRango.Style.Border.Right.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;

              fila1++;
            }

            // Ajustar el ancho de las columnas automáticamente
            hojaTrabajo1.Cells[hojaTrabajo1.Dimension.Address].AutoFitColumns();

            // Convertir el paquete de Excel a un arreglo de bytes
            byte[] bytes = package.GetAsByteArray();

            // Convertir los bytes a una cadena Base64
            string base64String = Convert.ToBase64String(bytes);

            // Asignar la cadena Base64 a la propiedad message de la respuesta _res
            _res.message = base64String;

            // Establecer las propiedades para la respuesta
            _res.ok = true;
            _res.title = "";
          }
        }
        else
        {
          _res.message = "No Data";
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
