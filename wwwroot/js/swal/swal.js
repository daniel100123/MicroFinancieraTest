
function swalError(message) {
 new swal(
    'Error',
    message,
    'error'
  );
};

function swalOk(message) {
  new swal(
    'Success',
    message,//'You clicked the <b style="color:green;">Success</b> button!',
    'success'
  )
}

function SMWithOk(data) {

  if (data != undefined) {

    if (data.type == "success" && data.ok) {

      new swal(
        'Success',
        data.message,
        'success'
      )

    } else if (data.type == "error" && !data.ok) {

      new  swal(
        'Error',
        data.message,
        'error'
      );

    } else if (data.type == "warning" && !data.ok) {

      new swal(
        'Warning',
        data.message,
        'warning'
      );

    } else if (data.type == "information" && !data.ok) {

      new swal(
        'Information',
        data.message,
        'info'
      );

    }
  }

}

function SMWithoutOk(data) {

  if (data != undefined) {

    if (!data.ok) {

      if (data.type == "error") {

        new swal(
          'Error',
          data.message,
          'error'
        );

      } else if (data.type == "warning") {

        new swal(
          'Advertencia',
          data.message,
          'warning'
        );

      } else if (data.type == "information") {

        new swal(
          'Información',
          data.message,
          'info'
        );

      }

    }
  }

}

function sessionError(title, message) {

  new swal({
    title: title,
    type: "warning",
    html: "<h6>" + message + "</h6>" + "<button type='button' class='btn btn-success' id='btn_logout'>Iniciar Sesión</button>",
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
}


function ShowMessage(message, isSucces) {
  new swal({
    title: isSucces ? "Success" : "Error",
    type: isSucces ? "success" : "error",
    message: message
  });

}
