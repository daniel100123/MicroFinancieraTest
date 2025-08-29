// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
function humanizeNumber(n) {
  n = n.toString()
  while (true) {
    var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, '$1,$2$3')
    if (n == n2) break
    n = n2
  }
  return n
}

function replaceblanks(n) {
  n = n.toString()
  while (true) {
    var n2 = n.replace(/\s/g, '')
    if (n == n2) break
    n = n2
  }
  return n
}

function ClearComas(value) {
  if (value == ''|| value == undefined)
    return 0;
  value = replaceblanks(value);
  value = value.toString().replace("$", "");
  value = value.toString().replace(",", "");
  value = value.toString().replace(",", "");
  value = value.toString().replace(",", "");
  value = value.toString().replace(",", "");
  value = value.toString().replace(",", "");
  value = value.toString().replace(",", "");
  value = value.toString().replace(",", "");
  value = value.toString().replace(",", "");
  value = value.toString().replace(",", "");
  return value;
}

function parseFloat2(value) {
  if (value == '' || value == undefined)
    return 0;
  value = ClearComas(value);
  value = Number(parseFloat(value).toFixed(2));
  return value;
}

function convertToFloat(value, fixed) {
  if (value == '' || value == undefined)
    return 0;
  value = ClearComas(value);
  value = Number(parseFloat(value).toFixed(2));
  

}

function formatCurrency(total) {
  var neg = false;
  if (total < 0) {
    neg = true;
    total = Math.abs(total);
  }
  return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}

  function showPleaseWait() {
      if (document.querySelector("#pleaseWaitDialog") == null) {
        var modalLoading = '<div class="modal" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false" role="dialog">\
    <div class="modal-dialog">\
      <div class="modal-content">\
        <div class="modal-header">\
          <h4 class="modal-title">Espere por favor...</h4>\
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

$("#pleaseWaitDialog").modal("show");
    }

/**
 * Hides "Please wait" overlay. See function showPleaseWait().
 */
function hidePleaseWait() {
  $("#pleaseWaitDialog").modal("hide");
}

function showProgress() {
  if (document.querySelector("#pleaseWaitDialogProgress") == null) {
    var modalLoading = '<div class="modal" id="pleaseWaitDialogProgress" data-backdrop="static" data-keyboard="false" role="dialog">\
                      <div class="modal-dialog">\
                          <div class="modal-content">\
                              <div class="modal-header">\
                                  <h5 class="modal-title">Consultando información. espere por favor...</h5>\
                              </div>\
                              <div class="modal-body">\
                                  <p>Progreso: <b id="barra-now">0</b> de <b id="barra-total">0</b> Registros.</p>\
                                  <div class="progress">\
                                    <div class="progress-bar progress-bar-success progress-bar-striped active  progress-bar-animated" role="progressbar"\
                                    aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%; height: 40px" id="barra">\
                                    </div>\
                                  </div>\
                              </div>\
                          </div>\
                      </div>\
                  </div>';
    $(document.body).append(modalLoading);
  }

  $("#pleaseWaitDialogProgress").modal("show");
}

function hideProgress() {
  $("#barra-total").html(0);
  $("#barra").attr("aria-valuenow", "0");
  $("#barra-now").html("0");
  $("#barra").css("width", "0");
  $("#pleaseWaitDialogProgress").modal("hide");
}



function validatetxtRequired(_object) {
  var object = $('#' + _object);
  object.removeClass();
  object.addClass("form-control");

  if (object.val().trim().length == 0) {
    object.addClass("is-invalid");
    return 1;
  }
  else
    object.addClass("is-valid");

  return 0;
}

function validateddlRequired(_object) {
  var object = $('#' + _object);
  object.removeClass();
  object.addClass("form-select");

  if (object.val() == 0) {
    // object.addClass("form-control form-control-danger");
    object.addClass("form-select is-invalid");
    return 1;
  }
  else
    //object.addClass("form-control form-control-sucess");
    object.addClass("form-select is-valid");
  return 0;
}


function downloadPDF(pdf, fileName) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  // const fileName = fileName;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

