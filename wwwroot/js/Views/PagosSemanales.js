let ahorroPagado = 0;
function getClients() {
  $.ajax({
    url: '../Administracion/GETClientes',
    type: 'get',
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        LoadDataSelect(".clientes", "Selecciona un Cliente", _res.data);
        getMetodoPago();
      }
    },
    error: function () {
      hLoading();
      swalError("An internal error occurred");
    }
  });
}
function GETCreditoCatalago() {
  $.ajax({
    url: '../Administracion/GETCreditoCatalago',
    type: 'get',
    data:{ clienteId: $(".clientes").val()},
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        LoadData2(".creditoId", "Selecciona un Credito", _res.data);
      }
    },
    error: function () {
      hLoading();
      swalError("An internal error occurred");
    }
  });
}
function getMetodoPago() {
  $.ajax({
    url: '../Administracion/GETMetodopago',
    type: 'get',
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        LoadData2(".metodoPago", "Selecciona un Metodo de Pago", _res.data);
      }
    },
    error: function () {
      hLoading();
      swalError("An internal error occurred");
    }
  });
}
function LoadData2(control, text, datos) {
  $(control).empty();
  $(control).append($('<option>', { text: text, value: 0 }));
  $.each(datos, function (index, item) {
    $(control).append($('<option>', { text: item.name, value: item.id }));
  });
}
function LoadDataSelect(control, text, datos) {
  $(control).empty(); // Limpiar las opciones previas
  $(control).append($('<option>', { text: text, value: 0 }));

  $.each(datos, function (index, item) {
    $(control).append($('<option>', { text: item.name, value: item.id }));
  });

  // Volver a inicializar `chosen` después de agregar las opciones
  $(control).trigger("chosen:updated");
}
function GetTableDetalleCliente() {
  moment.locale('ES');
  const formato = ('YYYY-MM-DD');
  let f = moment();
  let faux2;
  faux2 = f.format(formato);
  $.ajax({
    type: "POST",
    url: '../Administracion/GETDetalleSemanalCliente',
    data: { fecha: faux2, clientId: $(".clientes").val(), creditoId: $(".creditoId").val()}, 
    beforeSend: function () {
      sLoading();
    },
    success: function (_response) {
      hLoading();
      $("#pagoSemanal").html(ToMoney(_response.data[0].pagoTotalSemanal,2));
      $("#creditoI").html(ToMoney(_response.data[0].credito,2));
      $("#base").html(ToMoney(_response.data[0].baseInicial, 2));
      var ahorrototal = 0;
      var comision = 0;
      var comision2 = 0;
      $.each(_response.data, function (index, item) {
        if (item.ahorroPagado == true) {
          ahorrototal = ahorrototal + item.ahorro;
        }
        if (item.pagoComision == false) {
          comision2 = comision2 + item.comision;
        }
        comision = comision + item.comision;
      });
      $("#comisioTotal").html(ToMoney(comision, 2));
      $("#ahorroTotal").html(ToMoney(ahorrototal, 2));
      $("#basemasAhorro").html(ToMoney(_response.data[0].baseInicial + (ahorrototal - comision2), 2));
      FillTable("#tmain", _response);
    },
    error: function (e) {
      swalError("Ocurrió un error en la carga de información.");
    },
  });
}

function FillTable($table, res) {
  var dt = $('#tmain').DataTable();
  dt.destroy();

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
    "autoWidth": false,
    data: res.data,
    columns: [
      { data: "semana" },
      { data: "fechaPago" },
      { data: "fechaRealizada" },
      {
        data: "ahorroSemanal",
        render: (data, type, row) => {
          return row.ahorroPagado ? ToMoney(data, 2) : ToMoney(0, 2);
        }
      },
      { data: "comision", render: data => ToMoney(data, 2) },
      {
        data: "pagoComision",
        render: data => {
          return `<div class="text-center">
                    <input type="checkbox" ${data ? 'checked' : ''} disabled>
                  </div>`;
        }
      },
      { data: "cantidadPagada", render: data => ToMoney(data, 2) },
      {
        data: "pagoTotalSemanal",
        render: (data, type, row) => {
          return ToMoney(data + row.comision, 2);
        }
      },
      { data: "comentario" },
      {
        data: null,
        createdCell: function (td, cellData, rowData, row, col) {
          $(td).html('').append(
            $('<a/>', {
              html: 'Editar',
              class: 'badge bg-success',
              href: 'javascript:modifyParmeter2(' + JSON.stringify(rowData) + ')',
              click: function (e) {
                e.stopPropagation();
              }
            })
          );
        },
        responsivePriority: 1,
      },
      {
        data: null,
        createdCell: function (td, cellData, rowData, row, col) {
          $(td).html('').append(
            $('<a/>', {
              html: 'Eliminar',
              class: 'badge bg-danger',
              href: 'javascript:UpdatePago(' + JSON.stringify(rowData) + ')',
              click: function (e) {
                e.stopPropagation();
              }
            })
          );
        },
        responsivePriority: 1,
      }
    ],
    language: traslate_e_to_s,

    // Aquí agregamos la función para verificar la condición y cambiar el color de la fila
    createdRow: function (row, data, dataIndex) {
      // Convertir la cadena 'fechaPago' a un objeto de tipo Date
      const fechaPagoParts = data.fechaPago.split('-'); // Asumiendo que el formato es DD-MM-YYYY
      const fechaPago = new Date(`${fechaPagoParts[2]}-${fechaPagoParts[1]}-${fechaPagoParts[0]}`);
      const fechaActual = new Date(); // Fecha actual
      fechaActual.setHours(0, 0, 0, 0);
      // Verificar si fechaRealizada está vacía y si fechaPago es menor que la fecha actual
      if (!data.fechaRealizada && fechaPago < fechaActual) {
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

function modifyParmeter2(data) {
  $(".clientes").val(data.clienteId);
  $(".clientes").trigger("chosen:updated");
  $("#cantidadP").val(data.cantidadPagada);
  var fechaInicio = data.fechaRealizada;
  var partesFecha = fechaInicio.split("-");
  var fechaFormateada = partesFecha[2] + "-" + partesFecha[1] + "-" + partesFecha[0];
  $("#fechaRP").val(fechaFormateada);
  $("#semana").val(data.semana);
  $("#comentario").val(data.comentario);
  $("#comision").prop("checked", data.pagoComision === true);
  $("#ahorroPagado").prop("checked", data.ahorroPagado === true);
}
function UpdatePago(data) {
  $.ajax({
    url: '../Administracion/UpdatePago',
    type: 'get',
    data: { id: data.id },
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        swalSuccess("Delete Successfully");
        GetTableDetalleCliente();
      }
    },
    error: function () {
      hLoading();
      swalError("An internal error occurred");
    }
  });
}
function SavePago() {
  $.ajax({
    type: "POST",
    url: '../Administracion/SavePago',
    data: { clientId: $(".clientes").val(), pago: $("#cantidadP").val(), fecha: $("#fechaRP").val(), semana: $("#semana").val(), metodoDePagoId: $(".metodoPago").val(), pagoComision: $("#comision").prop("checked"), creditoId: $(".creditoId").val(), comentario: $("#comentario").val(), ahorroPagado: $("#ahorroPagado").prop("checked") },
    beforeSend: function () {
      sLoading();
    },
    success: function (_response) {
      hLoading();
      swalSuccess("Saved Successfully");
      GetTableDetalleCliente();
      document.getElementById('ticket').disabled = false;
    },
    error: function (e) {
      swalError("Ocurrió un error en la carga de información.");
    },
  });
}
function descargarTicket(cliente, fechaPago, semana, pago, metodoPago, creditoId) {
 

  $.ajax({
    type: "POST",
    url: "../Ticket/GenerateTicket",
    data: { clientId: cliente, fechaP: fechaPago, semana: semana, pago: pago, metodoPago: metodoPago, creditoId: creditoId },
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        var link = document.createElement("a");
        link.href = "data:application/pdf;base64," + _res.message;
        link.download = "Ticket.pdf";
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
//descargar excel

function descargarExcel() {
  moment.locale('ES');
  const formato = ('YYYY-MM-DD');
  let f = moment();
  let faux2;
  faux2 = f.format(formato);
  $.ajax({
    type: "POST",
    traditional: true,
    url: "../Administracion/GetExcelClient",
    data: { fecha: faux2, clientId: $(".clientes").val(), creditoId: $(".creditoId").val() },
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        var link = document.createElement("a");
        link.href = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + _res.message;
        link.download = "Detalle Semanal"  + ".xlsx";
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