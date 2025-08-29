namespace MicroFinanciera.Models
{
  public class vmModule
  {
    public int id { get; set; }
    public string name { get; set; }
    public string controller { get; set; }
    public string action { get; set; }
    public string icon { get; set; }
    public int position { get; set; }
    public List<vmSubModule> subModule { get; set; }

    public vmModule() : this(0, "", "", "","", 0, new List<vmSubModule>()) { }
    public vmModule(int _id, string _name, string _controller, string _action,string _icon, int _position, List<vmSubModule> _submodule)
    {
      id = _id;
      name = _name;
      controller = _controller;
      action = _action;
      icon = _icon;
      position = _position;
      subModule = _submodule;
    }
  }
}
