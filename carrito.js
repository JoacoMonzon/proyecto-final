const menus = [
    {nombre: "Inicio", url: "index.html"},
    {nombre: "¿Quienes somos?", url: "quienes somos.html"},
    {nombre: "Contacto", url: "contacto.html"}
];

function cargarmenu() {
    let enlaces = document.getElementById("ulmenu");
    for (const menu of menus) {
        let lista = document.createElement("li");
        lista.innerHTML = `<a href="${menu.url}">${menu.nombre}</a>`;
        enlaces.appendChild(lista);
    }
}

cargarmenu();

let productocarritos = JSON.parse(localStorage.getItem("carrito")) || [];

function cargarCarrito() {
    let enlaces = document.getElementById("tablacarrito");
    enlaces.innerHTML = ""; 

    if (productocarritos.length > 0) {
        let productosAgrupados = {};

        productocarritos.forEach(producto => {
            producto.cantidad = parseInt(producto.cantidad, 10);
            if (productosAgrupados[producto.id]) {
                productosAgrupados[producto.id].cantidad += producto.cantidad;
            } else {
                productosAgrupados[producto.id] = { ...producto };
            }
        });

        let total = 0;
        let cantidadTotal = 0;

        for (const id in productosAgrupados) {
            let producto = productosAgrupados[id];
            total += producto.cantidad * producto.precio;
            cantidadTotal += producto.cantidad;

            let lista = document.createElement("tr");
            lista.id = producto.id;
            lista.innerHTML = `
                <td><img src="${producto.img}" alt="" width="50"></td>
                <td>${producto.cantidad}</td>
                <td>${producto.nombre}</td> 
                <td>$ ${producto.precio}</td>
                <td>$ ${(producto.cantidad * producto.precio).toFixed(2)}</td>
                <td><button onclick="eliminarProducto('${producto.id}')">Eliminar</button></td>
            `;
            enlaces.appendChild(lista);
        }

        let totalFila = document.createElement("tr");
        totalFila.innerHTML = `
            <td colspan="5" style="text-align: right;">Total Final: $${total.toFixed(2)}</td>
            <td><button onclick="finalizarCompra()">Finalizar Compra</button></td>
        `;
        enlaces.appendChild(totalFila);

        localStorage.setItem("cantidadCarrito", cantidadTotal);
        actualizarCarrito(cantidadTotal);

    } else {
        let mensaje = document.createElement("tr");
        mensaje.innerHTML = "<td colspan='6'>No hay productos en el carrito</td>";
        enlaces.appendChild(mensaje);
        actualizarCarrito(0);
    }
}

function actualizarCarrito(totalProductos) {
    totalProductos = parseInt(totalProductos, 10) || 0;
    const cantidadCarritoElement = document.getElementById("cantidad-carrito");
    if (cantidadCarritoElement) {
        cantidadCarritoElement.textContent = totalProductos;
    }
    localStorage.setItem("cantidadCarrito", totalProductos);
}

function eliminarProducto(id) {
    productocarritos = productocarritos.filter(producto => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(productocarritos));
    cargarCarrito();
}

function finalizarCompra() {
    alert("Procediendo con la compra.");
}

cargarCarrito();
