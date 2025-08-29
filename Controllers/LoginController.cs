using MicroFinanciera.Data;
using MicroFinanciera.Models;
using MicroFinanciera.Service;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;

namespace MicroFinanciera.Controllers
{
  public class LoginController : Controller
  {
    private readonly ILogger<LoginController> _logger;
    public readonly Context _context;
    private readonly IConfiguration _configuration;
    public LoginController(Context context, ILogger<LoginController> logger, IConfiguration configuration)
    {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _context = context;
      _configuration = configuration;
    }
    public IActionResult Login()
    {
      return View();
    }
    public IActionResult LogOut()
    {
      Response<int> _res = new Response<int>();
      HttpContext.Session.Clear();
      _res.message = "Sesion cerrada Correctamente";
      _res.ok = true;
      _res.title = "";
      return Json(_res);
    }
    public IActionResult AuthenticateAdmin(string request)
    {
      Response<Object> _res = new Response<Object>();
      _res.message = "User y/o contraseña inconrrectos.";
      //  Utils utils = new Utils();
      try
      {
        Usuarios _user = JsonConvert.DeserializeObject<Usuarios>(request);
        // string pass2 = utils.EncryptString(_configuration.GetValue<string>("_key_"), _user.password);
        //  _user.password = pass2;
        var user = _context.Usuarios.Where(x => x.Usuario == _user.Usuario && x.Contrasenia == _user.Contrasenia && x.StatusId == 1)
        .Select(x => new
        {
          id = x.Id,
          usuarioRed = x.Usuario,
          //password = x.password,

          nombre = x.Usuario,
          IdPerfil = x.ProfileId
        })
        .FirstOrDefault();

        if (user != null)
        {
          if (user.usuarioRed == user.usuarioRed /*&& user.password == user.password*/)
          {
            _context.Access.Add(Access(user.id));
            _context.SaveChanges();

            Auth auth = new Auth();
            auth.userID = user.id;
            auth.userName = user.nombre;
            auth.profileID = user.IdPerfil;
            auth.usuarioRed = user.usuarioRed;
            SessionHelper.SetObjectAsJson(HttpContext.Session, "auth", auth);

            UserAux userAux = new UserAux();
            userAux.usuarioRed = user.usuarioRed;
            userAux.nombre = user.nombre;
            _res.data = userAux;
            _res.ok = true;
            _res.title = "";
            _res.message = "Acceso concedido.";
          }
        }
      }
      catch (Exception ex)
      {
        _res.ok = false;
        _res.message = _res.message + " : " + ex.Message;
      }
      return Json(_res);

    }
    private Access Access(int _Id)
    {
      Access _ba = new Access();

      string host = Dns.GetHostName();


      _ba.entry = DateTime.Now;
      _ba.exit = DateTime.Now;
      _ba.equipment = host;
      _ba.IPPublic = GetUserIP();

      _ba.mac = "S/D";
      _ba.userID = _Id;


      return _ba;
    }
    private string GetUserIP()
    {
      string ipList = Request.Headers["HTTP_X_FORWARDED_FOR"];

      if (!string.IsNullOrEmpty(ipList))
      {
        return ipList.Split(',')[0];
      }

      return Request.Headers["REMOTE_ADDR"];
    }
  }
}
