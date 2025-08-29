
function getReporte(fechaInicio, fechaFin) {
  $.ajax({
    url: '../Administracion/GetDetalleSemanalReportes',
    type: 'get',
    data: { fechaI: fechaInicio, fechaF: fechaFin },
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        var ahorroCapital = 0;
        var interes = 0;
        var iva = 0;
        var ahorro = 0;
        var efectivo = 0;
        var transferencia = 0;
        var invertido = 0;
        var comision = 0;
        var base = 0;
        var pagoSemanal = 0;
        $.each(_res.data, function (index, item) {
          if (item.semana != "base") {
            ahorroCapital = ahorroCapital + item.credito / 16;
            interes = interes + item.credito * 0.015;
            iva = iva + item.credito * 0.0024;
            ahorro = ahorro + item.ahorro;

          }
          if (item.metodoPago == "Efectivo") {
            efectivo = efectivo + item.cantidadPagada;
          }
          if (item.metodoPago == "Transferencia") {
            transferencia = transferencia + item.cantidadPagada;
          }
          comision = comision + item.comision;
          pagoSemanal = pagoSemanal + item.pagoSemanal;

          if (item.semana == "base") {
            invertido = invertido + item.credito;
            base = base + item.cantidadPagada
          }
        });
        $("#pagoCapital").html(ToMoney(ahorroCapital, 2));
        $("#interes").html(ToMoney(interes, 2));
        $("#iva").html(ToMoney(iva, 2));
        $("#ahorro").html(ToMoney(ahorro, 2));
        $("#total").html(ToMoney(efectivo + transferencia, 2));
        $("#transferencia").html(ToMoney(transferencia, 2));
        $("#efectivo").html(ToMoney(efectivo, 2));
        $("#invertido").html(ToMoney(invertido, 2));
        $("#comision").html(ToMoney(comision, 2));
        $("#base").html(ToMoney(base, 2));

        FillTable("#tmain", _res);
      }
    },
    error: function () {
      hLoading();
      swalError("An internal error occurred");
    }
  });
}
function FillTable($table, res) {
  var dt = $('#tmain').DataTable()
  dt.destroy()

  table = $($table).DataTable();
  table.clear();
  table.destroy();

  table = $($table).DataTable({
    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
    "iDisplayLength": 5,
    "responsive": true,
    "bFilter": true,
    "bLengthChange": true,
    "iDisplayLength": 5,
    "order": [[2, 'asc']],
    "scrollX": false,
    data: res.data,
    columns: [
      {
        data: "cliente",
      },
      {
        data: "fechaPagoRealizada",
      },
      {
        data: "semana",
      },

      {
        data: "cantidadPagada",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "comision",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "cantidadPagada",
        render: (data, type, row) => {
          let nuevoValor = data + row.comision;
          return ToMoney(nuevoValor, 2);
        }
      },
      {
        data: "metodoPago",
      },
      {
        data: "dia",
      },
    ],
    language: traslate_e_to_s
  });
  $('.dataTables_wrapper').css('overflow-x', 'auto');
  $('.table-responsive').css('width', '100%');
  $('.table-responsive table').css('white-space', 'nowrap');
  $($table).closest('.dataTables_wrapper').addClass('dtr-details');

  if (table.responsive.hasHidden()) {
    table.responsive.rebuild();
  }

}