let _tmain = undefined;
$(document).on('click', '.details-control', function () {
  var input = this;
  var td = $(input);
  var tr = $(td).parent();
  var row = _tmain.row(tr);
  if (row.child.isShown()) {
    row.child.hide();
    tr.removeClass('dt-hasChild shown');
  }
  else {
    row.child(expand_datails(row.data())).show();
    tr.addClass('dt-hasChild shown');
  }
});
function getClientsDeudores(dia) {
  $.ajax({
    url: '../Administracion/GETDeudores',
    type: 'get',
    data: { dia: dia },
    beforeSend: function () {
      sLoading();
    },
    success: function (_res) {
      if (_res.ok) {
        var ahorroCapital = 0;
        var interes = 0;
        var iva = 0;
        var ahorro = 0;
        var comision = 0;
        var falatante = 0;
        $.each(_res.data, function (index, item) {

          ahorroCapital = (ahorroCapital + ((item.credito / 16)) * item.pagosPendientes);
          interes = interes + ((item.credito * 0.015) * item.pagosPendientes);
          iva = iva + ((item.credito * 0.0024)* item.pagosPendientes);
          ahorro = ahorro + ((item.credito * 0.0075) * item.pagosPendientes);
          falatante = falatante + (item.pagoTotalSemanal * item.pagosPendientes);

          comision = comision + item.comision;

        });
        $("#pagoCapital").html(ToMoney(ahorroCapital, 2));
        $("#interes").html(ToMoney(interes, 2));
        $("#iva").html(ToMoney(iva, 2));
        $("#ahorro").html(ToMoney(ahorro, 2));
        $("#faltante").html(ToMoney(falatante, 2));


        FillTable("#tmain", _res);
        hLoading();
      }
    },
    error: function () {
      hLoading();
      swalError("An internal error occurred");
    }
  });
}
function FillTable($table, res) {
  _tmain = $("#tmain").DataTable();
  _tmain.clear();
  _tmain.destroy();


  _tmain = $($table).DataTable({
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
        "orderable": false,
        "data": null,
        "targets": 0,
        "width": 8,
        render: function (data, type, row) {
          return '<div class="details-control"></div>';
        },
        "className": "noExl", defaultContent: '',
      },
      {
        data: "name",
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
        data: "pagoTotalSemanal",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "ahorro",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "pagosPendientes",
      },
      {
        data: "comision",
        render: (data) => {
          return ToMoney(data, 2);
        }
      },
      {
        data: "adeudoTotal",
        render: (data, type, row) => {
          // Sumar el valor de "comision" al valor de "pagoTotalSemanal"
          let nuevoValor = data + row.comision;
          return ToMoney(nuevoValor, 2);
        }
      },
      {
        data: "fechaFinaliza",
      },
      {
        data: "creditoId"
      }
    ],
    language: traslate_e_to_s
  });
}
function expand_datails(d) {
  let bodyHTML = "";
  let bodyHTML2 = "";
  $.each(d.detail, (index, value) => {
    bodyHTML += `
                  <tr>
                    <td>${value.semana}</td>
                    <td>${value.fechaPago}</td>
                        <td>${ToMoney(value.comision * value.dias, 2)}</td>
                        <td>${value.dias}</td>
                  </tr>
                `;
  });
  return `
                          <table style="width: 100% !important;" class='table-sm'>
                <thead>
                  <tr>
                                 <th style="background-color:white !important; color: black;">Semana</th>
                             <th style="background-color:white !important; color: black;">Fecha de Pago</th>
                             <th style="background-color:white !important; color: black;">Comision</th>
                             <th style="background-color:white !important; color: black;">Dias Retrasados</th>
                  </tr>
                </thead>
                <tbody>
                ${bodyHTML}
                </tbody>
              </table>`;
}