function getStatus() {
  $.ajax({
    url: "http://129.80.254.55:8080/api/Reservation/report-status",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      pintarStatus(respuesta);
    },
  });
}

function pintarStatus(respuesta) {
  let myTable =
    '<table class="table-auto w-full text-left whitespace-no-wrap">';
  myTable += "<tr>";
  myTable += "<td>" + respuesta.completed + "</td>";
  myTable += "<td>" + respuesta.cancelled + "</td>";
  myTable += "</tr>";

  myTable += "</table>";
  $("#resultado1").html(myTable);
}

function getFechas() {}

function getClientes() {}
