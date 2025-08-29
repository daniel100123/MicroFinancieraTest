namespace MicroFinanciera.Models
{
  public class vmSubModule
  {
    public int id { get; set; }
    public string name { get; set; }
    public string action { get; set; }
    public string controller { get; set; }
    public int position { get; set; }
    public int moduleID { get; set; }
    public vmSubModule() : this(0, "", "", 0, 0, "") { }
    public vmSubModule(int _id, string _name, string _action, int _position, int _moduleID, string _controller)
    {
      id = _id;
      name = _name;
      action = _action;
      position = _position;
      moduleID = _moduleID;
      controller = _controller;
    }
  }
}
