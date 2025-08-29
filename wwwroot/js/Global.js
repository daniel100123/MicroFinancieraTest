// #### OTHER STATIC FUNCTIONS ######
function val(input) {
  return $.trim($(input).val());
}
function isInvalid(input) {
  return val(input) == "-1";
}
function isEmpty(input) {
  return val(input) == "";
}
function swalSuccess(m) {
  Swal.fire(
    'Success', m, 'success'
  )
}
function swalError(m) {
  Swal.fire(
    'Error', m, 'error'
  )
}
function limpiarElementos() {
  var inputs = document.querySelectorAll('input');
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    if (input.type === 'text' || input.type === 'number') {
      input.value = '';
    } else if (input.type === 'checkbox' && input.classList.contains('limpiar')) {
      input.checked = false;
    }
  }
  var selects = document.querySelectorAll('select');
  for (var j = 0; j < selects.length; j++) {
    var select = selects[j];
    select.selectedIndex = 0;
  }
  var textareas = document.querySelectorAll('textarea');
  for (var k = 0; k < textareas.length; k++) {
    var textarea = textareas[k];
    textarea.value = '';
  }
}


function disabled(input) {
  let html = $(input).html();
  $(input).html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando`)
  $(input).prop("disabled", true);
  return html;
}
function enable(input, html) {
  $(input).html(html)
  $(input).prop("disabled", false);
}
function LoadData(control, text, datos) {
  $(control).get(0).options.length = 0;
  $(control).get(0).options[0] = new Option(text, "-1");

  $.each(datos, function (index, item) {
    $(control).append($('<option>', { text: item.text, value: item.id }))
  });
}
function isValidEmail(email) {
  var email = email.trim().toLowerCase();

  var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return reg.test(email) && regOficial.test(email);
}
function isValidWebSite(web) {

  var web_aux = web.trim().toLowerCase();
  var regOficial = /(http|https)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
  return regOficial.test(web_aux);

}
function sLoading() {
  if (document.querySelector("#pleaseWaitDialog") == null) {
    var modalLoading = '<div class="modal" id="pleaseValidateWaitDialog" data-backdrop="static" data-keyboard="false" role="dialog">\
            <div class="modal-dialog"  style="z-index: 200;">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <h4 class="modal-title">Cargando información, espere por favor.</h4>\
                    </div>\
                    <div class="modal-body">\
                      <div class="progress">\
                        <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar"\
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%; height: 40px">\
                        </div>\
                      </div>\
                  </div>\
                </div>\
            </div>\
        </div>';
    $(document.body).append(modalLoading);
  }

  $("#pleaseValidateWaitDialog").modal("show");
}
function sLoadingSave() {
  if (document.querySelector("#pleaseWaitDialog") == null) {
    var modalLoading = '<div class="modal" id="pleaseValidateWaitDialog" data-backdrop="static" data-keyboard="false" role="dialog">\
            <div class="modal-dialog"  style="z-index: 200;">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <h4 class="modal-title">Guardando información, espere por favor.</h4>\
                    </div>\
                    <div class="modal-body">\
                      <div class="progress">\
                        <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar"\
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%; height: 40px">\
                        </div>\
                      </div>\
                  </div>\
                </div>\
            </div>\
        </div>';
    $(document.body).append(modalLoading);
  }

  $("#pleaseValidateWaitDialog").modal("show");
}
function hLoading() {
  $("#pleaseValidateWaitDialog").modal("hide");
}

function truncate(text, len) {
  let elem = "";
  if (text != undefined && len != undefined) {
    if (text != "" && !isNaN(len)) {
      if (len > 1) {
        let dataaux = text.length > len ? text.substring(0, len) : text;
        if (text.length > len) {
          elem = `
          <span class="tooltip_element_g_text" title="${text}">${dataaux}</span><a data-toggle="tooltip" class="tooltip_element_g" title="${text}" style="font-size: 18px; cursor: pointer; color: #007bff;">..</a>`;
        } else {
          elem = dataaux;
        }
      }
    }
  }
  return elem;
}


const traslate_e_to_s =
{
  "processing": "Procesando...",
  "lengthMenu": "Mostrar _MENU_",
  "zeroRecords": "No se encontraron resultados",
  "emptyTable": "Sin datos disponibles en esta tabla",
  "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
  "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
  "infoFiltered": "(filtrado de un total de _MAX_ registros)",
  "search": "",
  "infoThousands": ",",
  "loadingRecords": "Cargando...",
  "paginate": {
    "first": "Primero",
    "last": "Último",
    "next": "Siguiente",
    "previous": "Anterior"
  },
  "aria": {
    "sortAscending": ": Activar para ordenar la columna de manera ascendente",
    "sortDescending": ": Activar para ordenar la columna de manera descendente"
  },
  "buttons": {
    "copy": "Copiar",
    "colvis": "Visibilidad",
    "collection": "Colección",
    "colvisRestore": "Restaurar visibilidad",
    "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
    "copySuccess": {
      "1": "Copiada 1 fila al portapapeles",
      "_": "Copiadas %d fila al portapapeles"
    },
    "copyTitle": "Copiar al portapapeles",
    "csv": "CSV",
    "excel": "Excel",
    "pageLength": {
      "-1": "Mostrar todas las filas",
      "1": "Mostrar 1 fila",
      "_": "Mostrar %d filas"
    },
    "pdf": "PDF",
    "print": "Imprimir"
  },
  "autoFill": {
    "cancel": "Cancelar",
    "fill": "Rellene todas las celdas con <i>%d<\/i>",
    "fillHorizontal": "Rellenar celdas horizontalmente",
    "fillVertical": "Rellenar celdas verticalmentemente"
  },
  "decimal": ",",
  "searchPlaceholder": "Buscar...",
  "searchBuilder": {
    "add": "Añadir condición",
    "button": {
      "0": "Constructor de búsqueda",
      "_": "Constructor de búsqueda (%d)"
    },
    "clearAll": "Borrar todo",
    "condition": "Condición",
    "conditions": {
      "date": {
        "after": "Despues",
        "before": "Antes",
        "between": "Entre",
        "empty": "Vacío",
        "equals": "Igual a",
        "notBetween": "No entre",
        "notEmpty": "No Vacio",
        "not": "Diferente de"
      },
      "number": {
        "between": "Entre",
        "empty": "Vacio",
        "equals": "Igual a",
        "gt": "Mayor a",
        "gte": "Mayor o igual a",
        "lt": "Menor que",
        "lte": "Menor o igual que",
        "notBetween": "No entre",
        "notEmpty": "No vacío",
        "not": "Diferente de"
      },
      "string": {
        "contains": "Contiene",
        "empty": "Vacío",
        "endsWith": "Termina en",
        "equals": "Igual a",
        "notEmpty": "No Vacio",
        "startsWith": "Empieza con",
        "not": "Diferente de"
      },
      "array": {
        "not": "Diferente de",
        "equals": "Igual",
        "empty": "Vacío",
        "contains": "Contiene",
        "notEmpty": "No Vacío",
        "without": "Sin"
      }
    },
    "data": "Data",
    "deleteTitle": "Eliminar regla de filtrado",
    "leftTitle": "Criterios anulados",
    "logicAnd": "Y",
    "logicOr": "O",
    "rightTitle": "Criterios de sangría",
    "title": {
      "0": "Constructor de búsqueda",
      "_": "Constructor de búsqueda (%d)"
    },
    "value": "Valor"
  },
  "searchPanes": {
    "clearMessage": "Borrar todo",
    "collapse": {
      "0": "Paneles de búsqueda",
      "_": "Paneles de búsqueda (%d)"
    },
    "count": "{total}",
    "countFiltered": "{shown} ({total})",
    "emptyPanes": "Sin paneles de búsqueda",
    "loadMessage": "Cargando paneles de búsqueda",
    "title": "Filtros Activos - %d"
  },
  "select": {
    "1": "%d fila seleccionada",
    "_": "%d filas seleccionadas",
    "cells": {
      "1": "1 celda seleccionada",
      "_": "$d celdas seleccionadas"
    },
    "columns": {
      "1": "1 columna seleccionada",
      "_": "%d columnas seleccionadas"
    }
  },
  "thousands": ".",
  "datetime": {
    "previous": "Anterior",
    "next": "Proximo",
    "hours": "Horas",
    "minutes": "Minutos",
    "seconds": "Segundos",
    "unknown": "-",
    "amPm": [
      "am",
      "pm"
    ]
  },
  "editor": {
    "close": "Cerrar",
    "create": {
      "button": "Nuevo",
      "title": "Crear Nuevo Registro",
      "submit": "Crear"
    },
    "edit": {
      "button": "Editar",
      "title": "Editar Registro",
      "submit": "Actualizar"
    },
    "remove": {
      "button": "Eliminar",
      "title": "Eliminar Registro",
      "submit": "Eliminar",
      "confirm": {
        "_": "¿Está seguro que desea eliminar %d filas?",
        "1": "¿Está seguro que desea eliminar 1 fila?"
      }
    },
    "error": {
      "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
    },
    "multi": {
      "title": "Múltiples Valores",
      "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
      "restore": "Deshacer Cambios",
      "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
    }
  }
};
function ToMoney(n, d) {
  if (n == 0.00)
    return '-';

  n = n == undefined ? 0 : n;
  n = isNaN(n) ? 0 : n;
  if (d != undefined) {
    d = isNaN(d) ? 0 : d;
    n = n.toFixed(d);
  }
  n = n.toString();
  while (true) {
    var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, '$1,$2$3');
    if (n == n2) break;
    n = n2;
  }
  if (n.includes('-')) {
    n = n.replace("-", "");
    return `-$${n}`;
  } else {
    return '$' + n; // Devuelve el valor numérico formateado como moneda solo cuando se muestre
  }
}
//function ToMoney(n, d) {
//  n = n == undefined ? 0 : n;
//  n = isNaN(n) ? 0 : n;
//  if (d != undefined) {
//    d = isNaN(d) ? 0 : d;
//    n = n.toFixed(d);
//  }
//  n = n.toString();
//  while (true) {
//    var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, '$1,$2$3');
//    if (n == n2) break;
//    n = n2;
//  }
//  if (n.includes('-')) {
//    n = n.replace("-", "");
//    return `-${n}`;
//  } else {
//    return n;
//  }
//}
