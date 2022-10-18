///GET, POST, PUT Y DELETE

function getCliente() {
  $.ajax({
    url: "http://129.80.254.55:8080/api/Client/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      pintarCliente(respuesta);
    },
  });
}

function postCliente() {
  if (
    $("#email").val().length == 0 ||
    $("#password").val().length == 0 ||
    $("#name").val().length == 0 ||
    $("#age").val().length == 0
  ) {
    alert("Todos los campos son obligatorios para crear el cliente");
  } else {
    let cajas = {
      email: $("#email").val(),
      password: $("#password").val(),
      name: $("#name").val(),
      age: $("#age").val(),
    };
    $.ajax({
      url: "http://129.80.254.55:8080/api/Client/save",
      type: "POST",
      datatype: "JSON",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(cajas),
      success: function (respuesta) {
        alert("se creo correctamente la Cliente");
        window.location.reload();
      },
    });
  }
}

function putCliente(idBotonActualizar) {
  console.log(idBotonActualizar);
  if (
    $("#email").val().length == 0 ||
    $("#password").val().length == 0 ||
    $("#name").val().length == 0 ||
    $("#age").val().length == 0
  ) {
    alert("Todos los campos son obligatorios para actualizar el cliente");
  } else {
    let cajas = {
      id: idBotonActualizar,
      email: $("#email").val(),
      password: $("#password").val(),
      name: $("#name").val(),
      age: $("#age").val(),
    };
    $.ajax({
      url: "http://129.80.254.55:8080/api/Client/update",
      type: "PUT",
      datatype: "JSON",
      contentType: "application/json;",
      data: JSON.stringify(cajas),
      success: function (respuesta) {
        alert("se actualizo correctamente el cliente");
        window.location.reload();
      },
    });
  }
}

function deleteCliente(idBotonBorrar) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Esta seguro de borrar al cliente?",
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
          url: "http://129.80.254.55:8080/api/Cliente/" + idBotonBorrar,
          type: "DELETE",
          datatype: "JSON",
          contentType: "application/JSON",
          data: JSON.stringify(myData),
          success: function (respuesta) {
            alert("se borro correctamente la categoria");
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

/////////////////////////////////////////////////
function pintarCliente(respuesta) {
  let myTable =
    '<table class="table-auto w-full text-left whitespace-no-wrap">';
  for (i = 0; i < respuesta.length; i++) {
    myTable += "<tr>";
    myTable += "<td>" + respuesta[i].email + "</td>";
    myTable += "<td>" + respuesta[i].password + "</td>";
    myTable += "<td>" + respuesta[i].name + "</td>";
    myTable += "<td>" + respuesta[i].age + "</td>";
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
