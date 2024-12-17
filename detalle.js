const menus = [{nombre:"Inicio", url:"index.html"},
    {nombre:"Contacto", url:"contacto.html"},
    ]
    
    function cargarmenu(){
        let enlaces = document.getElementById("ulmenu")
        for (const menu of menus) {
            let lista = document.createElement("li")
            lista.innerHTML=`<a href="${menu.url}">${menu.nombre}</a>`
            enlaces.appendChild(lista);
            
        }
    }
    
    cargarmenu();

let productodetalle = JSON.parse(localStorage.getItem("detalleproducto"));

function cargarproducto() {
    let enlaces = document.getElementById("boxproducto");
    let lista = document.createElement("div");
    lista.innerHTML = `<h3>${productodetalle.nombre}</h3>
        <img src=${productodetalle.img} alt="" width="250">
        <p>$ ${productodetalle.precio}</p>
        <div class= "botonescontador">
        <button onclick="sumar()">+</button>
        <p id="contarproducto">0</p>
        <button onclick="restar()">-</button>
        </div>
        <button onclick="cargarcarrito()" id="botoncargar">Agregar al carrito</button>`;
        
        
    enlaces.appendChild(lista);
}
cargarproducto();

let contador = 0;

function sumar() {
    let nstock = productodetalle.stock;  // Asegúrate de que 'productodetalle' esté definido correctamente
    if (contador < nstock) {
        contador++;
        document.getElementById("contarproducto").innerHTML = contador;
    } else {
        alert("Stock agotado!");
    }
}


function restar(){
    if(contador > 0){
    contador = contador -1;
    document.getElementById("contarproducto").innerHTML = contador;
}
}

function cargarcarrito(){
    if (contador ===0) {
        alert("Ingrese la cantidad de productos deseados")
    }else {
        let carrito = JSON.parse(localStorage.getItem("carrito"))
    
    if (carrito === null) {
        carrito = [];
    }
    cantidadproducto = parseInt( document.getElementById("contarproducto").innerHTML);
    productonuevo = {id: productodetalle.id,
        nombre: productodetalle.nombre,
        cantidad: cantidadproducto,
        precio: productodetalle.precio,
        img: productodetalle.img
    }
    carrito.push(productonuevo)
    const enJSON = JSON.stringify(carrito)
    localStorage.setItem("carrito", enJSON)
    window.location.href= "carrito.html";
    }
}

function actualizarCarrito() {
 
    let cantidadTotal = parseInt(localStorage.getItem("cantidadCarrito"), 10) || 0;

    
    const cantidadCarritoElement = document.getElementById("cantidad-carrito");
    if (cantidadCarritoElement) {
        cantidadCarritoElement.textContent = cantidadTotal;
    }
}


window.addEventListener('DOMContentLoaded', function() {
    actualizarCarrito();
});
