function Save(data,type) {
  var request = {
    "request": JSON.stringify(data),
  }
  $.ajax({
    type: "POST",
    url: '../Clientes/SaveClientes',
    data: request,
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        swalSuccess("Saved Successfully");
        if (type == 2) {
          descargarTicket(data.Id, data.FechaInicio, 'base', data.BaseInicial, data.MetodoDePagoId,1);
          GetTable(1);
        } else {
          GetTable(0);
        }
      }
      else
        swalError(_res.message);
    },
    error: function () {
      hLoading();
      swalError("An internal error occurred");
    }
  });
}
function SaveSolicitud(data,data2,data3, type) {
  var request = {
    "request": JSON.stringify(data),
    "request2": JSON.stringify(data2),
    "request3": JSON.stringify(data3)
  };
  $.ajax({
    type: "POST",
    url: '../Clientes/SaveClientes',
    data: request,
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        swalSuccess("Saved Successfully");
          GetTable(type);
      }
      else
        swalError(_res.message);
    },
    error: function () {
      hLoading();
      swalError("An internal error occurred");
    }
  });
}
function EliminarSolicitud(data) {
  var request = {
    "request": JSON.stringify(data),
  }
  $.ajax({
    type: "POST",
    url: '../Clientes/EliminarSolicitud',
    data: request,
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        swalSuccess("Saved Successfully");
          GetTable(1);   
      }
      else
        swalError(_res.message);
    },
    error: function () {
      hLoading();
      swalError("An internal error occurred");
    }
  });
}
function AprobarSolicitud(data, type) {
  var request = {
    "request": JSON.stringify(data),
  }
  $.ajax({
    type: "POST",
    url: '../Clientes/AprobarClientes',
    data: request,
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        swalSuccess("Saved Successfully");
        if (type == 2) {
          descargarTicket(data.Id, data.FechaInicio, 'base', data.BaseInicial, data.MetodoDePagoId, 1);
          GetTable(1);
        } else {
          GetTable(0);
        }
      }
      else
        swalError(_res.message);
    },
    error: function () {
      hLoading();
      swalError("An internal error occurred");
    }
  });
}
function GetTable(type) {
  $.ajax({
    type: "POST",
    url: '../Clientes/GETClientes',
    data: {type: type},
    beforeSend: function () {
      sLoading();
    },
    success: function (_response) {
      hLoading();
      getMetodoPago();
      if (type == 1) {
        FillTableSolicitud("#tmain", _response);

      } else {
        FillTable("#tmain", _response);

      }
    },
    error: function (e) {
      swalError("Ocurrió un error en la carga de información.");
    },
  });
}
function getGarantias() {
  $.ajax({
    url: '../Clientes/GetGarantia',
    type: 'get',
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        LoadDataSelect(".garantia", "Selecciona", _res.data);
        getGenero();
      }
    },
    error: function () {
      hLoading();
      swalError("An internal error occurred");
    }
  });
}
function getGenero() {
  $.ajax({
    url: '../Clientes/GetGenero',
    type: 'get',
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      hLoading();
      if (_res.ok) {
        LoadDataSelect(".genero", "Selecciona", _res.data);
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
    "order": [[1, 'asc']],
    "scrollX": false,
    data: res.data,
    columns: [
      {
        data: "nombres",
      },
      {
        data: "credito",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "fechaInicio",
      },
      {
        data: "baseInicial",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "ahorroSemanal",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "pagoTotalSemanal",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data:"diaPago",
      },
      {
        data: "statusId",
        render: (data) => {
          if (data === 1) {
            return '<div class="text-center"><input type="checkbox" checked disabled></div>';
          } else {
            return '<div class="text-center"><input type="checkbox" disabled></div>';
          }
        }
      },
      {
        data: "fechaRegistro",
      },
      {
        data: null,
        createdCell: function (td, cellData, rowData, row, col) {
          $(td).html('').append(
            $('<a/>', {
              html: 'Editar',
              class: 'badge bg-success',
              href: 'javascript:modifyParmeter2(' + JSON.stringify(rowData) + ')',
              click: function (e) {
                e.stopPropagation(); // Evita que el evento de clic se propague a los elementos responsivos
              }
            })
          );
        },
      }

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

function FillTableSolicitud($table, res) {
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
    "order": [[1, 'asc']],
    "scrollX": false,
    data: res.data,
    columns: [
      {
        data: "nombres",
      },
      {
        data: "credito",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "fechaInicio",
      },
      {
        data: "baseInicial",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "ahorroSemanal",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "pagoTotalSemanal",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "diaPago",
      },
      {
        data: "statusId",
        render: (data) => {
          if (data === 1) {
            return '<div class="text-center"><input type="checkbox" checked disabled></div>';
          } else {
            return '<div class="text-center"><input type="checkbox" disabled></div>';
          }
        }
      },
      {
        data: "fechaRegistro",
      },
      {
        data: null,
        createdCell: function (td, cellData, rowData, row, col) {
          $(td).html('').append(
            $('<a/>', {
              html: 'Editar',
              class: 'badge bg-success',
              href: 'javascript:modifyParmeter2(' + JSON.stringify(rowData) + ')',
              click: function (e) {
                e.stopPropagation(); // Evita que el evento de clic se propague a los elementos responsivos
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
              html: 'Aprobar',
              class: 'badge bg-primary',
              href: 'javascript:aprobar(' + JSON.stringify(rowData) + ')',
              click: function (e) {
                e.stopPropagation(); // Evita que el evento de clic se propague a los elementos responsivos
              }
            })
          );
        },
        responsivePriority: 1,
      }, {
        data: null,
        createdCell: function (td, cellData, rowData, row, col) {
          $(td).html('').append(
            $('<a/>', {
              html: 'Eliminar',
              class: 'badge bg-danger',
              href: 'javascript:Eliminar(' + JSON.stringify(rowData) + ')',
              click: function (e) {
                e.stopPropagation(); // Evita que el evento de clic se propague a los elementos responsivos
              }
            })
          );
        },
        responsivePriority: 1,
      }

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
function aprobar(datos) {
  var data = {};
  data.Id = datos.id;
  data.Nombre = datos.nombre;
  data.Apellido1 = datos.apellido1
  data.Apellido2 = datos.apellido2
  data.Solicitud = 0;
  data.CreditoId = 1;
  AprobarSolicitud(data,2);
}
function Eliminar(datos) {
  var data = {};
  data.Id = datos.id;
  EliminarSolicitud(data, 2);
}
function modifyParmeter2(data) {
  $("#id").val(data.id);
  $("#nombres").val(data.nombres);
  $("#nombre").val(data.nombre);
  $("#apellido1").val(data.apellido1);
  $("#apellido2").val(data.apellido2);

  var fechaInicio = data.fechaInicio;
  var partesFechaInicio = fechaInicio.split("-");
  var fechaFormateadaInicio = partesFechaInicio[2] + "-" + partesFechaInicio[1] + "-" + partesFechaInicio[0];
  $("#fechaInicial").val(fechaFormateadaInicio);

  if (data.fechaSolicitud != "") {
    var fechaSolicitud = data.fechaSolicitud;
    var partesFechaSolicitud = fechaSolicitud.split("-");
    var fechaFormateadaSolicitud = partesFechaSolicitud[2] + "-" + partesFechaSolicitud[1] + "-" + partesFechaSolicitud[0];
    $("#fechaSolicitud").val(fechaFormateadaSolicitud);
  }


  $("#credito").val(data.credito);
  $("#baseInicial").val(data.baseInicial);
  $("#ahorroSemanal").val(data.ahorroSemanal);
  $("#pagoTotalSemnal").val(data.pagoTotalSemanal);
  $("#diaPago").val(data.diaPago);
  $("#statusId").val(data.statusId);


  $(".metodoPago").val(data.metodoDePagoId);
  $(".metodoPago").trigger("chosen:updated");

  $(".genero").val(data.generoId);
  $(".genero").trigger("chosen:updated");


  $("#telefono").val(data.telefono);

  if (data.fechaNacimiento != "") {
    var fechaNacimiento = data.fechaNacimiento;
    var partesFechaNacimiento = fechaNacimiento.split("-");
    var fechaFormateadaNacimiento = partesFechaNacimiento[2] + "-" + partesFechaNacimiento[1] + "-" + partesFechaNacimiento[0];
    $("#fechaNacimiento").val(fechaFormateadaNacimiento);
  }

  $("#pais").val(data.pais);
  $("#nacionalidad").val(data.nacionalidad);
  $("#estadoCivil").val(data.estadoCivil);
  $("#aval").val(data.aval);
  $("#domicilioAval").val(data.domicilioAval);
  $("#telefonoAval").val(data.telefonoAval);
  $("#telefono2").val(data.telefono2);
  $("#telefonoAval2").val(data.telefonoAval2);
  $("#domicilioCasa").val(data.domicilioCasa);
  $("#medidasCasa").val(data.medidasCasa);
  $("#descripcionCasa").val(data.descripcionCasa);
  $("#marcaCarro").val(data.marcaCarro);
  $("#modeloCarro").val(data.modeloCarro);
  $("#colorCarro").val(data.colorCarro);
  $("#kilometrajeCarro").val(data.kilometrajeCarro);
  $("#placasCarro").val(data.placasCarro);
  $("#ubicacionTerreno").val(data.ubicacionTerreno);
  $("#dimensionTerreno").val(data.dimensionTerreno);
  $("#marcaMoto").val(data.marcaMoto);
  $("#modeloMoto").val(data.modeloMoto);
  $("#colorMoto").val(data.colorMoto);
  $("#kilometrajeMoto").val(data.kilometrajeMoto);
  $("#placasMoto").val(data.placasMoto);
  $("#descripcionOtro").val(data.descripcionOtro);

  $(".garantia").val(data.garantiaId);
  $(".garantia").trigger("chosen:updated");

  // Domicilio fields
  $("#tipoPropiedad").val(data.tipoPropiedad);
  $("#domicilio").val(data.domicilio);
  $("#colonia").val(data.colonia);
  $("#delegacionMunicipio").val(data.delegacionMunicipio);
  $("#poblacion").val(data.poblacion);
  $("#estado").val(data.estado);
  $("#paisDomicilio").val(data.paisDomicilio);
  $("#codigoPostal").val(data.codigoPostal);
  $("#aniosResidencia").val(data.aniosResidencia);
  $("#domicilioAnterior").val(data.domicilioAnterior);
  $("#coloniaAnterior").val(data.coloniaAnterior);
  $("#delegacionMunicipioAnterior").val(data.delegacionMunicipioAnterior);

  // Empleo fields
  $("#empresa").val(data.empresa);
  $("#giroNegocio").val(data.giroNegocio);
  $("#ocupacion").val(data.ocupacion);

  if (data.fechaIngreso != "") {
    var fechaIngreso = data.fechaIngreso;
    var partesFechaIngreso = fechaIngreso.split("-");
    var fechaFormateadaIngreso = partesFechaIngreso[2] + "-" + partesFechaIngreso[1] + "-" + partesFechaIngreso[0];
    $("#fechaIngreso").val(fechaFormateadaIngreso);
  }


  $("#sueldo").val(data.sueldo);
  $("#fuenteOtrosIngresos").val(data.fuenteOtrosIngresos);

  const casaDiv = document.getElementById('casa');
  const carroDiv = document.getElementById('carro');
  const terrenoDiv = document.getElementById('terreno');
  const motoDiv = document.getElementById('moto');
  const otroDiv = document.getElementById('otro');
  if (data.garantiaId == 1) {
    casaDiv.hidden = false;
  } else {
    casaDiv.hidden = true;
  }
  if (data.garantiaId == 3) {
    carroDiv.hidden = false;
  } else {
    carroDiv.hidden = true;
  }
  if (data.garantiaId == 2) {
    terrenoDiv.hidden = false;
  } else {
    terrenoDiv.hidden = true;
  }
  if (data.garantiaId == 4) {
    motoDiv.hidden = false;
  } else {
    motoDiv.hidden = true;
  }
  if (data.garantiaId == 5) {
    otroDiv.hidden = false;
  } else {
    otroDiv.hidden = true;
  }
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

function descargarTicket(cliente, fechaPago, semana, pago, metodoPago) {


  $.ajax({
    type: "POST",
    url: "../Ticket/GenerateTicket",
    data: { clientId: cliente, fechaP: fechaPago, semana: semana, pago: pago, metodoPago: metodoPago },
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

//renovaciones
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
function LoadDataSelect(control, text, datos) {
  $(control).empty(); // Limpiar las opciones previas
  $(control).append($('<option>', { text: text, value: 0 }));

  $.each(datos, function (index, item) {
    $(control).append($('<option>', { text: item.name, value: item.id }));
  });

  // Volver a inicializar `chosen` después de agregar las opciones
  $(control).trigger("chosen:updated");
}

function SaveRenovacion() {
  $.ajax({
    type: "POST",
    url: '../Clientes/SaveRenovacion',
    data: { id: $("#id").val(), clientId: $(".clientes").val(), credito: $("#credito").val(), fechaInicial: $("#fechaInicial").val(), baseInicial: $("#baseInicial").val(), ahorroSemanal: $("#ahorroSemanal").val(), pagoTotalSemnal: $("#pagoTotalSemnal").val(), metodoPago: $(".metodoPago").val(), FechaFinalizaCreditoAnterior: $("#fechaTermino").val(), fechaSolicitud: $("#fechaSolicitud").val(), ahorroParaBase: $("#ahorroBase").prop("checked") },
    beforeSend: function () {
      sLoading();
    },
    success: function (_response) {
      hLoading();
      swalSuccess("Saved Successfully");
      GetTableRenovacion(0);
      document.getElementById('ticket').disabled = false;
    },
    error: function (e) {
      swalError("Ocurrió un error en la carga de información.");
    },
  });
}
function GetTableRenovacion(id) {
  $.ajax({
    type: "POST",
    url: '../Clientes/GETClientesRenovacion',
    data: {id: id},
    beforeSend: function () {
      sLoading();
    },
    success: function (_response) {
      hLoading();
      if (id == 0) {
        getMetodoPago();
        FillTable2("#tmain", _response);
      }
      if (id == 1) {
        FillTable3("#tmain", _response);
      }
    },
    error: function (e) {
      swalError("Ocurrió un error en la carga de información.");
    },
  });

  function FillTable2($table, res) {
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
      "order": [[1, 'asc']],
      "scrollX": false,
      data: res.data,
      columns: [
        {
          data: "nombres",
        },
        {
          data: "credito",
          render: (data) => {
            return ToMoney(data, 2);
          }
        },
        {
          data: "fechaSolicitud",
        },
        {
          data: "fechaInicio",
        },
        {
          data: "baseInicial",
          render: (data) => {
            return ToMoney(data, 2);
          }
        },
        {
          data: "ahorroSemanal",
          render: (data) => {
            return ToMoney(data, 2);
          }
        },
        {
          data: "pagoTotalSemanal",
          render: (data) => {
            return ToMoney(data, 2);
          }
        },
        {
          data: "diaPago",
        },
        {
          data: "creditoId",
        },
        {
          data: "statusId",
          render: (data) => {
            if (data === 1) {
              return '<div class="text-center"><input type="checkbox" checked disabled></div>';
            } else {
              return '<div class="text-center"><input type="checkbox" disabled></div>';
            }
          }
        },
        {
          data: null,
          createdCell: function (td, cellData, rowData, row, col) {
            $(td).html('').append(
              $('<a/>', {
                html: 'Modificar',
                class: 'badge bg-success',
                href: 'javascript:modifyParmeter3(' + JSON.stringify(rowData) + ')',
                click: function (e) {
                  e.stopPropagation(); // Evita que el evento de clic se propague a los elementos responsivos
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
                html: 'Aprobar',
                class: 'badge bg-info',
                href: 'javascript:AprobarRenovacion(' + JSON.stringify(rowData) + ')',
                click: function (e) {
                  e.stopPropagation(); // Evita que el evento de clic se propague a los elementos responsivos 
                }
              })
            );
          },
          responsivePriority: 1,
        },
        {
          data: "fechaFinalizaCreditoAnterior",
        }

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
}
function modifyParmeter3(data) {
  $("#id").val(data.id);
  $(".clientes").val(data.clienteId);
  $(".clientes").trigger("chosen:updated");
  // Asigna la fecha formateada al campo
  var fechaInicio = data.fechaInicio;
  var partesFecha = fechaInicio.split("-");
  var fechaFormateada = partesFecha[2] + "-" + partesFecha[1] + "-" + partesFecha[0];
  $("#fechaInicial").val(fechaFormateada);
  $("#credito").val(data.credito);
  
  $("#baseInicial").val(data.baseInicial);
  $("#ahorroSemanal").val(data.ahorroSemanal);
  $("#pagoTotalSemnal").val(data.pagoTotalSemanal);
  $(".metodoPago").val(data.metodoDePagoId);
  $(".metodoPago").trigger("chosen:updated");

  var fechaSolicitud = data.fechaSolicitud;
  var partesFechaS = fechaSolicitud.split("-");
  var fechaFormateadaS = partesFechaS[2] + "-" + partesFechaS[1] + "-" + partesFechaS[0];
  $("#fechaSolicitud").val(fechaFormateadaS);
  // Asigna la fecha formateada al campo
  var fechaFinalizaCreditoAnterior = data.fechaFinalizaCreditoAnterior;
  var partesFecha2 = fechaFinalizaCreditoAnterior.split("-");
  var fechaFormateada2 = partesFecha2[2] + "-" + partesFecha2[1] + "-" + partesFecha2[0];
  $("#fechaTermino").val(fechaFormateada2);
}
function AprobarRenovacion(data) {
  var fechaInicio = data.fechaInicio;
  var partesFecha = fechaInicio.split("-");
  var fechaFormateada = partesFecha[2] + "-" + partesFecha[1] + "-" + partesFecha[0];
  $.ajax({
    type: "POST",
    url: '../Clientes/SaveRenovacionDetalleSemanas',
    data: { id: data.id, clientId: data.clienteId, fechaInicial: fechaFormateada },
    beforeSend: function () {
      sLoading();
    },
    success: function (_response) {
      hLoading();
      swalSuccess("Saved Successfully");
      GetTableRenovacion(0);
      document.getElementById('ticket').disabled = false;
    },
    error: function (e) {
      swalError("Ocurrió un error en la carga de información.");
    },
  });
}

function FillTable3($table, res) {
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
    "order": [[1, 'asc']],
    "scrollX": false,
    data: res.data,
    columns: [
      {
        data: "nombres",
      },
      {
        data: "credito",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "fechaInicio",
      },
      {
        data: "baseInicial",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "ahorroSemanal",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "pagoTotalSemanal",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "diaPago",
      },
      {
        data: "creditoId",
      },
      {
        data: "statusId",
        render: (data) => {
          if (data === 1) {
            return '<div class="text-center"><input type="checkbox" checked disabled></div>';
          } else {
            return '<div class="text-center"><input type="checkbox" disabled></div>';
          }
        }
      },
      {
        data: "fechaFinalizaCreditoAnterior",
      }

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