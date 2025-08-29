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
  tabElement.innerHTML += 'Registro Semanal Del  ' + diaInicio + '  Al  ' + diaFin + "  De  " + mes + " " + '<i class="bi bi-clipboard-data"></i>';
  getReporte(datestar, dateend);
}
function getReporte(fechaInicio, fechaFin) {
  $.ajax({
    url: '../Administracion/GetDetalleSemanal',
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
            if (item.cantidadPagada > 0) {
              ahorroCapital = ahorroCapital + item.credito / 16;
              interes = interes + item.credito * 0.015;
              iva = iva + item.credito * 0.0024;

                if (item.pagoComision == true) {
                    comision = comision + item.comision;
                }
              
              
            }
            invertido = invertido + item.credito;
            ahorro = ahorro + item.ahorro;
              if (item.metodoPago == "Efectivo") {
                  if (item.pagoComision == true) {
                      efectivo = efectivo + item.cantidadPagada + item.comision;
                  } else {
                      efectivo = efectivo + item.cantidadPagada;
                  }
            }
              if (item.metodoPago == "Transferencia") {
                  if (item.pagoComision == true) {
                      transferencia = transferencia + item.cantidadPagada + item.comision;
                  } else {
                      transferencia = transferencia + item.cantidadPagada;
                  }
            }
            pagoSemanal = pagoSemanal + item.pagoSemanal;
          }
          if (item.semana == "base") {
           // invertido = invertido + item.credito;
          //  base = base + item.cantidadPagada
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
        //$("#base").html(ToMoney(base, 2));
        $("#ingresar").html(ToMoney(pagoSemanal, 2));
        $("#faltante").html(ToMoney(pagoSemanal - (efectivo + transferencia), 2));
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
  var dt = $('#tmain').DataTable();
  dt.destroy();

  // Filtrar los datos para excluir aquellos donde semana = 'base'
  var filteredData = res.data.filter(item => item.semana !== 'base');

  table = $($table).DataTable();
  table.clear();
  table.destroy();

  table = $($table).DataTable({
    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
    "iDisplayLength": 5,
    "responsive": true,
    "bFilter": true,
    "bLengthChange": true,
    "scrollX": false,
    "order": [], // Evita el ordenamiento predeterminado
    data: filteredData, // Utilizar los datos filtrados
    columns: [
      { data: "cliente" },
      {
        data: "credito",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      { data: "fechaPago" },
      { data: "fechaPagoRealizada" },
      { data: "semana" },
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
        data: "pagoSemanal",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "pagoSemanal",
        render: (data, type, row) => {
          let nuevoValor = data + row.comision;
          return ToMoney(nuevoValor, 2);
        }
      },
      { data: "metodoPago" },
      { data: "creditoId" },
      {
        data: "cantidadPagada",
        render: (data) => {
          if (data > 0) {
            return '<div class="text-center"><input type="checkbox" checked disabled></div>';
          } else {
            return '<div class="text-center"><input type="checkbox" disabled></div>';
          }
        }
      },
      { data: "dia" },
    ],
    language: traslate_e_to_s,

    // Agregamos la función para cambiar el color de la fila según la condición
    createdRow: function (row, data, dataIndex) {
      // Convertir la cadena 'fechaPago' a un objeto de tipo Date
      const fechaPagoParts = data.fechaPago.split('-'); // Asumiendo formato DD-MM-YYYY
      const fechaPago = new Date(`${fechaPagoParts[2]}-${fechaPagoParts[1]}-${fechaPagoParts[0]}`);
      const fechaActual = new Date(); // Fecha actual
      fechaActual.setHours(0, 0, 0, 0);
      // Verificar si 'fechaPagoRealizada' está vacía y 'fechaPago' es menor que la fecha actual
      if (data.fechaPagoRealizada == "" && fechaPago < fechaActual ) {
        // Cambiar el color de la fila a rojo si se cumplen las condiciones
        $(row).css('background-color', '#EA6464'); // Rojo claro
      }
    }
  });

  $('.dataTables_wrapper').css('overflow-x', 'auto');
  $('.table-responsive').css('width', '100%');
  $('.table-responsive table').css('white-space', 'nowrap');
  $($table).closest('.dataTables_wrapper').addClass('dtr-details');

  if (table.responsive.hasHidden()) {
    table.responsive.rebuild();
  }
}
function descargarExcel(fechaInicio, fechaFin,type) {
  $.ajax({
    type: "POST",
    traditional: true,
    url: "../Administracion/GetExcelRegistroSemanal",
    data: { fechaI: fechaInicio, fechaF: fechaFin,clientId:0,creditoId:0,type:type },
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        var link = document.createElement("a");
        link.href = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + _res.message;
        if (type == 1) {
          link.download = "Registro Semanal Deudores" + ".xlsx";

        } else {
          link.download = "Registro Semanal" + ".xlsx";
        }
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

