
using MicroFinanciera.Data;
using MicroFinanciera.Models;
using MicroFinanciera.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace MicroFinanciera.Controllers
{
  public class TicketController : Controller
  {
    public readonly Context _context;
    private readonly IWebHostEnvironment _env;
    public TicketController(Context context, IWebHostEnvironment hostingEnvironment)
    {
      _context = context;
      _env = hostingEnvironment;
    }
    public IActionResult Index()
    {
      return View();
    }
    public IActionResult GenerateTicket(int clientId,string fechaP,string semana,double pago,int metodoPago,int creditoId)
    {
     
      Response<object> _res = new Response<object>();
      vmTicket vmTicket = new vmTicket();
      QryClient qry = new QryClient();
      _res.ok = false;
      _res.title = "";

      try
      {
        // Obtener los datos del empleado
        vmTicket = _context.vmTicket.FromSqlRaw(qry.getReTicket, fechaP, semana, clientId, pago, metodoPago, creditoId).ToList().FirstOrDefault();
        TimeZoneInfo zonaHoraria = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time (Mexico)");
        DateTime horaEnZona = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zonaHoraria);
        string hora = horaEnZona.ToString("hh:mm:ss tt");
        if (vmTicket != null)
        {
          // Establecer la ruta y crear el archivo PDF
          //if (string.IsNullOrWhiteSpace(_env.WebRootPath))
          //{
          //  _env.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
          //}
          //var dest = Path.Combine(_env.WebRootPath, "pdf\\Ticket.pdf");
          string tempPath = Path.GetTempPath(); // Obtiene el directorio temporal
          string dest = Path.Combine(tempPath, "Ticket.pdf"); // Combina el directorio temporal con el nombre del archivo


          // Configurar el tamaño del ticket (ancho más pequeño)
          Document doc = new Document(new iTextSharp.text.Rectangle(220f, 600f));
          //Document doc = new Document(new iTextSharp.text.Rectangle(220f, 600f), 10f, 10f, 10f, 10f);

          // Ticket de 220x600 puntos
          PdfWriter.GetInstance(doc, new FileStream(dest, FileMode.Create));
          doc.Open();

          // Configurar la fuente y los estilos
          BaseFont bf = BaseFont.CreateFont(BaseFont.COURIER, BaseFont.CP1252, false);
          BaseFont bf2 = BaseFont.CreateFont(BaseFont.COURIER, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
          iTextSharp.text.Font normalFont = new iTextSharp.text.Font(bf2, 7f, iTextSharp.text.Font.UNDEFINED, BaseColor.BLACK);

          iTextSharp.text.Font boldFont = new iTextSharp.text.Font(bf, 12f, iTextSharp.text.Font.BOLD, BaseColor.BLACK);
          iTextSharp.text.Font boldFont2 = new iTextSharp.text.Font(bf, 10f, iTextSharp.text.Font.BOLD, BaseColor.BLACK);

          // Añadir contenido al ticket
          string imagePath = "wwwroot/img/logoNaby2.jpeg"; // Reemplaza con la ruta de tu imagen

          iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance(imagePath);

          // Paso 2: Ajustar el tamaño de la imagen
          logo.ScaleToFit(100f, 40f);  // Ajusta el tamaño de la imagen (ancho y alto)
          logo.Alignment = Element.ALIGN_CENTER; // Alinea la imagen al centro

          // Paso 3: Agregar la imagen al documento
          doc.Add(logo);
          Paragraph name1 = new Paragraph("NABY FAST SA DECV", boldFont);
          name1.Alignment = Element.ALIGN_CENTER;
          doc.Add(name1);
          Paragraph name = new Paragraph("MICROFINANCIERA", boldFont);
          name.Alignment = Element.ALIGN_CENTER;
          doc.Add(name);
          Paragraph titleParagraph = new Paragraph("TICKET DE PAGO SOCIO " , boldFont2);
          titleParagraph.Alignment = Element.ALIGN_CENTER;
          doc.Add(titleParagraph);
          doc.Add(new Paragraph("------------------------------", normalFont));
          doc.Add(new Paragraph("FECHA DE INICIO: " + vmTicket.fechaInicio, normalFont));
          doc.Add(new Paragraph("CREDITO: " + String.Format("${0:n}", vmTicket.credito), normalFont));
          doc.Add(new Paragraph("ESTADO: Mexico" , normalFont));
          doc.Add(new Paragraph("SUCURSAL: Tejupilco" , normalFont));
          doc.Add(new Paragraph("TELEFONO: 7224992091", normalFont));
          doc.Add(new Paragraph("SOCIO: " + vmTicket.cliente, normalFont));
          doc.Add(new Paragraph("ID SOCIO: "+ vmTicket.idCliente , normalFont));
          doc.Add(new Paragraph("CICLO:("+ vmTicket.creditoId + ")    SEMANA: "+vmTicket.semana +"/16", normalFont));

          doc.Add(new Paragraph("FECHA:" + vmTicket.fechaRealiza + "  HORA:"+ hora, normalFont));


          doc.Add(new Paragraph("------------------------------", normalFont));

          doc.Add(new Paragraph("PAGO SEMANAL: " + String.Format("${0:n}",(vmTicket.pagoTotalSemanal - vmTicket.ahorroSemanal)), normalFont));
          doc.Add(new Paragraph("AHORRO SEMANAL: " + String.Format("${0:n}", vmTicket.ahorroSemanal), normalFont));
          doc.Add(new Paragraph("PAGO MORA: " + String.Format("${0:n}", vmTicket.comision), normalFont));
          doc.Add(new Paragraph("TOTAL: " + String.Format("${0:n}",(vmTicket.pagoTotalSemanal + vmTicket.comision)), normalFont));

          doc.Add(new Paragraph("------------------------------", normalFont));

          doc.Add(new Paragraph("SALDO AHORRO SEMANAL: " + String.Format("${0:n}",(vmTicket.baseInicial + vmTicket.ahorroTotal)), normalFont));
          Paragraph titleParagraph2 = new Paragraph("A PAGAR PROXIMA SEMANA: ", boldFont2);
          titleParagraph2.Alignment = Element.ALIGN_CENTER;
          doc.Add(titleParagraph2);

          doc.Add(new Paragraph("NABY: " + String.Format("${0:n}", (vmTicket.credito/16) + (vmTicket.credito * 0.015) + (vmTicket.credito * 0.0024)), normalFont));
          doc.Add(new Paragraph("AHORRO: " + String.Format("${0:n}", vmTicket.credito * 0.0075), normalFont));
          doc.Add(new Paragraph("MORA: " + 0, normalFont));
          doc.Add(new Paragraph("Total : " + String.Format("${0:n}", vmTicket.pagoTotalSemanal), normalFont));
          doc.Add(new Paragraph("------------------------------", normalFont));
          doc.Add(new Paragraph("Atendio: " + "Microfinanciera NABY", normalFont));
          doc.Add(new Paragraph("------------------------------", normalFont));

          doc.Close();

          // Convertir el PDF a Base64
          byte[] bytes = System.IO.File.ReadAllBytes(dest);
          _res.message = Convert.ToBase64String(bytes);
          _res.ok = true;
          _res.title = "Ticket generado correctamente";
        }
        else
        {
          _res.message = "No se encontraron datos para el cliente.";
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
