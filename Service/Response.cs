using Microsoft.Data.SqlClient;

namespace MicroFinanciera.Service
{
  public class Response<T> : Parms where T : new()
  {
    public T data { get; set; }
    public Response() : this("error", false, true, "", "Ocurrió un error interno por favor inténtalo más tarde.", new T()) { }
    public Response(string type, bool ok, bool session, string title, string message, T data) : base(type, ok, session, title, message, null)
    {
      this.data = data;
    }
  }

  public class Response : Parms
  {

    public object data { get; set; }
    public Response() : this("error", false, true, "", "Ocurrió un error interno por favor inténtalo más tarde.", new { }) { }
    public Response(string type, bool ok, bool session, string title, string message, object data) : base(type, ok, session, title, message, null)
    {
      this.data = data;
    }
  }

  public class Parms
  {
    public string type { get; set; }
    public bool ok { get; set; }
    public bool session { get; set; }
    public string title { get; set; }
    public string message { get; set; }
    public object info { get; set; }

    public Parms() : this("error", false, true, "", "Ocurrió un error interno por favor inténtalo más tarde.", null) { }
    public Parms(string type, bool ok, bool session, string title, string message, object info)
    {
      this.type = type;
      this.ok = ok;
      this.session = session;
      this.title = title;
      this.message = message;
      this.info = info;
    }

    public void Error(string message)
    {
      this.ok = false;
      this.message = message;
      this.type = "error";
    }

    public void Warning(string message)
    {
      this.ok = false;
      this.message = message;
      this.type = "warning";
    }

    public void Information(string message)
    {
      this.ok = false;
      this.message = message;
      this.type = "information";
    }

    public void Error(Exception ex)
    {
      this.ok = false;
      this.message = "Ocurrió un error interno, por favor contactar a sistemas. detalle: " + ex.Message;
      this.type = "error";
    }

    public void Ok(string message)
    {
      this.ok = true;
      this.message = message;
      this.type = "success";
    }
    public void Ok()
    {
      this.ok = true;
      this.message = "Proceso realizado con éxito.";
      this.type = "success";
    }

    private void Find()
    {
      this.ok = true;
      this.message = "Información encontrada";
      this.type = "success";
    }

    private void NotFind()
    {
      this.ok = true;
      this.message = "Información no encontrada";
      this.type = "information";
    }

    public void HasRows(SqlDataReader dr)
    {
      if (dr.HasRows) Find();
      else NotFind();
    }

    public void DBCatchResponseInOneLine(SqlDataReader dr)
    {
      if (dr != null)
      {
        string _message = dr["Message"].ToString();
        bool _ok = Convert.ToBoolean(dr["Ok"]);

        if (_message != null)
        {
          if (_ok)
          {
            Ok(_message);
          }
          else
          {
            Error(_message);
          }
        }
        else
        {
          throw new Exception();
        }

      }
      else
      {
        throw new Exception();
      }
    }
  }
}
