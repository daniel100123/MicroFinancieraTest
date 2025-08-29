namespace MicroFinanciera.Models
{
  public class vmModuleDetail
  {

    public int id { get; set; }
    public string name { get; set; }
    public string controller { get; set; }
    public string icon { get; set; }
    public int subModuleID { get; set; }
    public string subModuleName { get; set; }
    public string subModuleAction { get; set; }
    public vmModuleDetail() : this(0, "", "","", 0, "", "") { }
    public vmModuleDetail(int _id, string _name, string _controller,string _icon, int _submoduleID, string _submoduleName, string _submoduleAction)
    {
      id = _id;
      name = _name;
      controller = _controller;
      icon = _icon;
      subModuleID = _submoduleID;
      subModuleName = _submoduleName;
      subModuleAction = _submoduleAction;
    }
  }
}
