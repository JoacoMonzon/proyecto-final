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
    const productos = [
        {nombre: "Heladera", precio: "1000", img: "Imagenes/h.jpg", id: "1", stock: 10},
        {nombre: "Tele", precio: "6000", img: "Imagenes/t.jpg", id: "2", stock: 10},
        {nombre: "Lavaropas", precio: "3000", img: "Imagenes/l.jpg", id: "3", stock: 10},
        {nombre: "Microondas", precio: "4000", img: "Imagenes/m.jpg", id: "4", stock: 10},
        {nombre: "Secadora", precio: "5000", img: "Imagenes/s.jpg", id: "5", stock: 10},
        {nombre: "Gabinete", precio: "6000", img: "Imagenes/g.jpg", id: "6", stock: 10},
        {nombre: "Monitor", precio: "7000", img: "Imagenes/mm.webp", id: "7", stock: 10},
        {nombre: "Pc Gamer", precio: "8000", img: "Imagenes/p.jpg", id: "8", stock: 10}
    ];


    function cargarproductos() {
        let ventas = document.getElementById("boxproducto");
        for (const producto of productos) {
            let contenedor = document.createElement("div");
            contenedor.innerHTML = `<div class="boxproducto">
                <h3>${producto.nombre}</h3>
                <img src="${producto.img}" alt="" width="100"> 
                <p>$${producto.precio}</p>
                <button onclick="verdetalle('${producto.id}')">detalle</button>
                </div>`;
            ventas.appendChild(contenedor);
        }
    }
    
    cargarproductos();
    
    function verdetalle(idproducto){
        const buscarproducto=productos.find(producto => producto.id === (idproducto));
        const enJSON =JSON.stringify(buscarproducto);
        localStorage.setItem("detalleproducto", enJSON)
        window,location.href= "detalle.html";
    
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
    
