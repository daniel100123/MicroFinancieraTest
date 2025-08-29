function calcularFecha() {
  const formato = ('YYYY-MM-DD');
  const formarDS = ('d');
  var fecha = $("#semana").val();

  if (fecha == "") {
    f = moment();
    f.format(formarDS);
  } else {
    f = moment(fecha);
    f.format(formarDS);
  }
  var datestar;
  datestar = fecha;
  var aux2 = moment(datestar);
  var dia2 = aux2.clone().add(6, 'days');
  var dateend = dia2.format(formato);

  var tabElement = document.getElementById('tab1');
  tabElement.innerHTML = "";
  var diaInicio = moment(datestar).format('DD');
  var mes = moment(datestar).format('MMMM');
  var diaFinAux = moment(datestar);
  var dia2 = diaFinAux.clone().add(5, 'days');
  var dateend2 = dia2.format(formato);
  var diaFin = moment(dateend2).format('DD');
  var tabElement = document.getElementById('tab1');

  // Agregar el texto "de Javier" al contenido del elemento
  tabElement.innerHTML += 'Reporte Semanal Del  ' + diaInicio + '  Al  ' + diaFin + "  De  " + mes + " " + '<i class="bi bi-clipboard-data"></i>';
  getReporte(datestar, dateend);
}
function getReporte(fechaInicio,fechaFin) {
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
        let clientesProcesados = new Set();
        $.each(_res.data, function (index, item) {
          if (item.semana != "base") {
            ahorroCapital = ahorroCapital + item.credito / 16;
            interes = interes + item.credito * 0.015;
            iva = iva + item.credito * 0.0024;
            ahorro = ahorro + item.ahorro;
            // Solo suma el crédito si el cliente no ha sido procesado antes
            if (!clientesProcesados.has(item.cliente)) {
              invertido = invertido + item.credito;
              clientesProcesados.add(item.cliente); // Marca al cliente como procesado
            }
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
    "order": [],
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
function descargarExcel(fechaInicio, fechaFin) {
  $.ajax({
    type: "POST",
    traditional: true,
    url: "../Administracion/GetExcelPagoSemanal",
    data: { fechaI: fechaInicio, fechaF: fechaFin },
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        var link = document.createElement("a");
        link.href = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + _res.message;
        link.download = "Reporte Semanal" + ".xlsx";
        link.click();
      } else {
        swalError(_res.message);
      }
    },
    error: function () {
      hLoading();
      swalError("An internal error occurred");
    }
  });
}
