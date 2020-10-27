import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";
import Funko from "./funko.js";
import $ from "jquery";
import Swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/js/all.min.js';
//inicializo variables

let listaFunkos = [];
leerProducto();
let productoExistente = false; // false es cuando quiero agregar un nuevo producto y cuando sea verdadero  es cuando voy a editar

//esta funcion la llamo en el boton agregar despues modifico y la llamo dentro de la funcion
//agregarModificar(e) que la pongo en el boton agregar
window.agregarFunko = function () {
  let codigo = document.getElementById("codigo").value;
  let nombre = document.getElementById("nombre").value;
  let numSerie = document.getElementById("numSerie").value;
  let categoria = document.getElementById("categoria").value;
  let descripcion = document.getElementById("descripcion").value;
  let imagen = document.getElementById("imagen").value;
  let precio = document.getElementById("precio").value;
  //validar crear un if para validar los campos esto esta en la clse de eventos

  //creo el nuevo objeto
  let nuevoFunko = new Funko(
    codigo,
    nombre,
    numSerie,
    categoria,
    descripcion,
    imagen,
    precio
  );
  // los guardo con el push en el array que estaba vacio
  listaFunkos.push(nuevoFunko);
  //guardo en el localstorage
  localStorage.setItem("funkoKey", JSON.stringify(listaFunkos));

  limpiarFormulario();
  leerProducto();

  let ventanaModal = document.getElementById("modalProducto");
  $(ventanaModal).modal("hide");

  Swal.fire(
    'Producto Agregado!',
    'Tu producto se agrego correctamente!',
    'success'
  )
};

// limpio el formulario, con reset y le pongo la funcion bandera que
 //me permite agregar un producto ** aqui le cambio y la llamo en el boton agregar del HTML
 //para solucionar un error, ahora la escribo con window
window.limpiarFormulario = function () {
  let formulario = document.getElementById("formProducto");
  formulario.reset();
  //cuando esta en false puedo agregar
  productoExistente = false;
};

//esta funcion es para pintar la tabla
function leerProducto() {
  //pregunto si hay algo en localstorage
  if (localStorage.length > 0) {
    //si es asi lo traigo y guardo en un array _listaFunkos
    let _listaFunkos = JSON.parse(localStorage.getItem("funkoKey"));
    //pregunto si listaFunkos no esta vacio
    if (listaFunkos.length == 0) {
      //le asigno el valor de _listaFunkos que es lo que traje del
      //localstorage, se lo asigno al array listaFunkos asi se igualan
      listaFunkos = _listaFunkos;
    }
    //borrar tabla
    borrarTabla();
    //dibujar tabla
    dibujarTabla(_listaFunkos);
  }
}

//aqui dibujo la tabla traigo el HTML y le injecto las variables
function dibujarTabla(_listaFunkos) {
  // traigo al elemento padre y lo guardo en una variable
  let tablaFunko = document.getElementById("tablaFunko");
  //creo una variable vacia donde voy almacenar el codigo HTML
  let codHtml = "";
  //hago un for con el array que traje del localstorage, para pintar cada posicion
  for (let i in _listaFunkos) {
    //cada posicion toma el valor
    codHtml = `<tr>
        <th scope="row">${_listaFunkos[i].codigo}</th>
        <td>${_listaFunkos[i].nombre}</td>
        <td>${_listaFunkos[i].numSerie}</td>
        <td>${_listaFunkos[i].categoria}</td>
        <td>${_listaFunkos[i].descripcion}</td>
        <td>${_listaFunkos[i].imagen}</td>
        <td>$${_listaFunkos[i].precio}</td>
        <td>
          <button class="btn btn-outline-primary btn-sm " onclick= "modificarProducto(${_listaFunkos[i].codigo})"><i class="far fa-edit"></i></button>
          <button class="btn btn-outline-danger btn-sm" onclick="eliminarProducto(this)"
           id="${_listaFunkos[i].codigo}"><i class="far fa-trash-alt"></i></button>
        </td>`;
    //a la tabla le pongo los valores y le pongo += para que acumule cada objeto
    tablaFunko.innerHTML += codHtml;
  }
}

//borro la tabla
function borrarTabla() {
  let tablaFunko = document.getElementById("tablaFunko");
  //pregunto si la tabla tiene hijos si es mayor q 0
  if (tablaFunko.children.length > 0) {
    //entonces al primer hijo quiero borrarlo
    while (tablaFunko.firstChild) {
      tablaFunko.removeChild(tablaFunko.firstChild);
    }
  }
}


// para eliminar esta la llamo en el boton eliminar
window.eliminarProducto = function (botonEliminar) {
  //pregunto si hay algo en el localstorage
  if (localStorage.length > 0) {
    let _listaFunkos = JSON.parse(localStorage.getItem("funkoKey"));

    Swal.fire({
      title: 'Estas seguro de querer eliminar este producto?',
      text: "Si elimina no hay vuelta atras!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC143C',
      cancelButtonColor: '#87CEEB',
      confirmButtonText: 'Borrar!'
    }).then((result) => {


      if (result.isConfirmed) {

         //filtro el array y se crea otro array con el resultado del filtro
    let datosFiltrados = _listaFunkos.filter(function (producto) {
      return producto.codigo != botonEliminar.id;
    });
      //guardo el array filtrado en el localstorage
      localStorage.setItem("funkoKey", JSON.stringify(datosFiltrados));
      //llamo a la funcion para que pinte la tabla
      leerProducto();
      // le asigno al array los valores del array filtrado
      listaFunkos = datosFiltrados;

        Swal.fire(
          'Producto Borrado!',
          'Su producto fue eliminado correctamente.',
          'success'
        )
      }else{
        Swal.fire(
          'Cancelado!',
          'Tu producto esta a salvo.',
          'success'
        )

      }
    })
    
  }
};





// esta funcion la llamo en el boton editar
window.modificarProducto = function (codigo) {
  // busco el objeto del producto seleccionado que quiero editar
  let objetoEncontrado = listaFunkos.find(function (producto) {
    return producto.codigo == codigo;
  });
  // cargo los datos en el modal
  document.getElementById("codigo").value = objetoEncontrado.codigo;
  document.getElementById("nombre").value = objetoEncontrado.nombre;
  document.getElementById("numSerie").value = objetoEncontrado.numSerie;
  document.getElementById("categoria").value = objetoEncontrado.categoria;
  document.getElementById("descripcion").value = objetoEncontrado.descripcion;
  document.getElementById("imagen").value = objetoEncontrado.imagen;
  document.getElementById("precio").value = objetoEncontrado.precio;

  let ventanaModal = document.getElementById("modalProducto");
  $(ventanaModal).modal("show"); //traigo modal con los datos , esto es para abrirlo
  productoExistente = true; // en true es para editar
};

//esta funcion la llamo en el submit del form
window.agregarModificar = function (event) {
  event.preventDefault();
  if (productoExistente == false) {
    // quiero agregar un nuevo producto
    agregarFunko();
  } else {
    Swal.fire({
      title: 'Esta seguro de querer modificar el producto?',
      text: "No sera posible revertir los cambios!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#DC143C',
      cancelButtonColor: '#87CEEB',
      confirmButtonText: 'Modificar!'
    }).then((result) => {
      if (result.isConfirmed) {
        //quiero editar un producto
        guardarProductoModificado();
        Swal.fire(
          'Producto Modificado!',
          'tu producto fue modificado exitosamente.',
          'success' )
      }
    })
  }
};
//aqui guardo una vez editado
function guardarProductoModificado() {
  let codigo = document.getElementById("codigo").value;
  let nombre = document.getElementById("nombre").value;
  let numSerie = document.getElementById("numSerie").value;
  let categoria = document.getElementById("categoria").value;
  let descripcion = document.getElementById("descripcion").value;
  let imagen = document.getElementById("imagen").value;
  let precio = document.getElementById("precio").value;

  for (let i in listaFunkos) {
    if (listaFunkos[i].codigo == codigo) {
      listaFunkos[i].nombre = nombre;
      listaFunkos[i].numSerie = numSerie;
      listaFunkos[i].categoria = categoria;
      listaFunkos[i].descripcion = descripcion;
      listaFunkos[i].imagen = imagen;
      listaFunkos[i].precio = precio;
    }
  }
  localStorage.setItem("funkoKey", JSON.stringify(listaFunkos));
  leerProducto(); //llamo a la funcion para actualizar los cambios en pantalla
  limpiarFormulario(); //limio y pongo en false
  let ventanaModal = document.getElementById("modalProducto");
  $(ventanaModal).modal("hide"); // traigo el form y pongo para ocultar el modal
}




