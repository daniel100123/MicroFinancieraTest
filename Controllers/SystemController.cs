using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using MicroFinanciera.Data;
using MicroFinanciera.Models;
using MicroFinanciera.Service;
using Microsoft.EntityFrameworkCore;


namespace MicroFinanciera.Controllers
{
  public class SystemController : Controller
  {
    public readonly Context _context;
    public SystemController(Context context)
    {
      _context = context;
    }
    public IActionResult Index()
    {
      return View();
    }

    public IActionResult ObtenerMenu()
    {
      Response<List<vmModule>> res = new Response<List<vmModule>>();

      try
      {

        var session = SessionHelper.GetObjectFromJson<Auth>(HttpContext.Session, "auth").profileID;
        //var session = HttpContext.Session.GetString("profileID");
        if (session != null)
        {
          long profileID = Convert.ToInt64(session);

          List<vmModuleDetail> module = _context.vmModuleDetail.FromSqlRaw("SELECT A.id AS id, C.name, b.controller, B.id AS subModuleID, B.name as subModuleName, B.action submoduleAction,C.icon FROM ProfileDetail A JOIN Submodule B ON A.subModuleID = B.id JOIN Module C ON B.moduleID = C.id WHERE A.profileID = @id AND A.statusId = 1 ORDER BY C.position ASC ,B.Position ASC", new SqlParameter("@Id", profileID)).AsNoTracking().ToList(); //, B.SPosition ASC
          int pos = 0;
          int pos0 = 0;

          foreach (var item in module)
          {
            if (res.data.Count == 0)
            {
              res.data.Add(AddNewModule(item));
              pos0 = 1;
            }
            else
            {
              if (res.data[pos].name == item.name)
              {
                res.data[pos].subModule.Add(AddNewSubmodule(item));
              }
              else
              {
                res.data.Add(AddNewModule(item));

                pos++;
                res.data[pos].subModule.Add(AddNewSubmodule(item));
              }
            }
          }

          if (pos > 0 || pos0 == 1)
          {
            res.ok = true;
            res.message = "Información encontrada.";
            res.title = "ok";
          }



        }
      }
      catch (Exception ex)
      {
        res.ok = false;
        res.message = res.message + " : " + ex.Message;
      }
      return Json(res);
    }


    // @@@ [AddNewModulo] Solo return un nuevo objecto de tipo [ModuloViewModel]
    private vmModule AddNewModule(vmModuleDetail _det)
    {
      vmModule mod = new vmModule();
      mod.id = _det.id;
      mod.name = _det.name;
      mod.controller = _det.controller;
      mod.icon = _det.icon;
      mod.position = 0;
      mod.action = _det.subModuleAction;
      return mod;
    }
    private vmSubModule AddNewSubmodule(vmModuleDetail _det)
    {
      vmSubModule sub = new vmSubModule();
      sub.id = _det.subModuleID;
      sub.name = _det.subModuleName;
      sub.action = _det.subModuleAction;
      sub.controller = _det.controller;
      sub.position = 0;
      sub.moduleID = _det.id;
      return sub;
    }
  }
}
