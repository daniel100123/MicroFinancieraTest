using MicroFinanciera;
using Microsoft.AspNetCore.Hosting;

public class Program
{
  public static void Main(string[] args)
  {
    try
    {
      CreateHostBuilder(args).Build().Run();
    }
    catch (Exception ex)
    {
      var i = 0;
    }
  }

  public static IHostBuilder CreateHostBuilder(string[] args) =>
      Host.CreateDefaultBuilder(args)
          .ConfigureWebHostDefaults(webBuilder =>
          {
            webBuilder.UseStartup<Startup>();
          });
}