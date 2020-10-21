import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
import Funko from './funko.js';
//inicializo variables

let listaFunkos = [];
leerProducto();

window.agregarFunko = function(event){

    event.preventDefault();

    let codigo = document.getElementById('codigo').value;
    let nombre = document.getElementById('nombre').value;
    let numSerie = document.getElementById('numSerie').value;
    let categoria = document.getElementById('categoria').value;
    let descripcion = document.getElementById('descripcion').value;
    let imagen = document.getElementById('imagen').value;
    let precio = document.getElementById('precio').value;
    //validar crear un if para validar los campos esto esta en la clse de eventos

    let nuevoFunko = new Funko(codigo,nombre,numSerie,categoria,descripcion,imagen,precio);

    listaFunkos.push(nuevoFunko);
    localStorage.setItem("funkoKey", JSON.stringify(listaFunkos));
    
    limpiarFormulario();
    
}

function limpiarFormulario(){
    let formulario = document.getElementById('formProducto');
    formulario.reset();
}

function leerProducto(){
    if(localStorage.length > 0){

        let _listaFunkos = JSON.parse(localStorage.getItem('funkoKey'));
        if(listaFunkos.length == 0){
            listaFunkos = _listaFunkos;
        }
    }
}