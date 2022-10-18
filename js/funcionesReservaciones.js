/////////////GET, POST,PUT Y DELETE

function getReservaciones() {
  $.ajax({
    url: "http://129.80.254.55:8080/api/Reservation/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      pintarReservaciones(respuesta);
      console.log(respuesta);
    },
  });
}

/////////////////////////////////////////////////
function pintarReservaciones(respuesta) {
  let myTable =
    '<table class="table-auto w-full text-left whitespace-no-wrap">';
  for (i = 0; i < respuesta.length; i++) {
    myTable += "<tr>";
    myTable += "<td>" + respuesta[i].startDate + "</td>";
    myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
    myTable += "<td>" + respuesta[i].status + "</td>";
    myTable += "<td>" + respuesta[i].client.name + "</td>";
    myTable += "<td>" + respuesta[i].room.name + "</td>";
    myTable +=
      "<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='putCategoria(" +
      respuesta[i].id +
      ")'>Actualizar</button>";
    myTable +=
      "<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='deleteCategoria(" +
      respuesta[i].id +
      ")' >Borrar</button>";
    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#resultado1").html(myTable);
}

function postReservaciones() {
  if (
    $("#startDate").val().length == 0 ||
    $("#devolutionDate").val().length == 0
  ) {
    alert("Todos los campos son obligatorios");
  } else {
    let cajas = {
      startDate: $("#startDate").val(),
      devolutionDate: $("#devolutionDate").val(),
      status: $("#status").val(),
      room: { id: +$("#select-room").val() },
      client: { idClient: +$("#select-client").val() },
    };

    $.ajax({
      url: "http://129.80.254.55:8080/api/Reservation/save",
      type: "POST",
      datatype: "JSON",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(cajas),
      success: function (respuesta) {
        alert("se creo correctamente la reservacion");
        window.location.reload();
      },
    });
  }
}

function putReservaciones(idBotonActualizar) {
  console.log(idBotonActualizar);
  if (
    $("#startDate").val().length == 0 ||
    $("#devolutionDate").val().length == 0
  ) {
    alert("Todos los campos son obligatorios para actualizar");
  } else {
    let cajas = {
      id: idBotonActualizar,
      startDate: $("#startDate").val(),
      devolutionDate: $("#devolutionDate").val(),
      status: $("#status").val(),
      room: { id: +$("#select-room").val() },
      client: { idClient: +$("#select-client").val() },
    };

    $.ajax({
      url: "http://129.80.254.55:8080/api/Reservation/update",
      type: "PUT",
      datatype: "JSON",
      contentType: "application/json",
      data: JSON.stringify(cajas),
      success: function (respuesta) {
        alert("se actualizo correctamente la categoria");
        window.location.reload();
      },
    });
  }
}

function deleteReservaciones(idBotonBorrar) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Esta seguro de borrar la reservación?",
      text: "¡No podrás revertir esto!",
      icon: "Advertencia",
      showCancelButton: true,
      confirmButtonText: "Si, borralo",
      cancelButtonText: "!No, cancela!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        let myData = {
          id: idBotonBorrar,
        };
        $.ajax({
          url: "http://129.80.254.55:8080/api/Reservation/" + idBotonBorrar,
          type: "DELETE",
          datatype: "JSON",
          contentType: "application/JSON",
          data: JSON.stringify(myData),
          success: function (respuesta) {
            //alert("Se borro correctamente la reservacion");
            window.location.reload();
          },
        });
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Your file has been deleted.",
          "success"
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your imaginary file is safe :)",
          "error"
        );
      }
    });
}

function getCliente_Reservaciones() {
  $.ajax({
    url: "http://129.80.254.55:8080/api/Client/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      let $select = $("#select-client");
      $.each(respuesta, function (id, name) {
        $select.append(
          "<option value=" + name.idClient + ">" + name.name + "</option>"
        );
      });
    },
  });
}

function getRoom_Reservaciones() {
  $.ajax({
    url: "http://129.80.254.55:8080/api/Room/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      let $select = $("#select-room");
      $.each(respuesta, function (id, name) {
        $select.append(
          "<option value=" + name.id + ">" + name.name + "</option>"
        );
      });
    },
  });
}
