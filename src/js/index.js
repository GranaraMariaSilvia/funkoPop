import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";

leerStorage();

function leerStorage() {
  if (localStorage.length > 0) {
    let listaProductos = JSON.parse(localStorage.getItem("funkoKey"));
    let catalogo = document.getElementById("catalogo");

    for (let i in listaProductos) {
      let codigoHtml = `<div class="col-sm-12 col-md-4 col-lg-3 my-2 shadow">

            <div class="card">
              <img src="./img/productos/${listaProductos[i].imagen}" class="card-img-top" alt="${listaProductos[i].nombre}">
              <div class="card-body">
                <h5 class="card-title">${listaProductos[i].nombre}</h5>
                <p class="card-text">${listaProductos[i].descripcion}.</p>
                 <p> Precio $${listaProductos[i].precio}</p>
                <a href="#" class="btn btn-secondary disabled">Comprar</a>
              </div>
            </div>
  
          </div> `;

         catalogo.innerHTML += codigoHtml;
    }
  }
}
