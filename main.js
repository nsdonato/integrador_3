let productos = [
    [1, "Notebook Lenobo S400", 100, true],
    [2, "Celular Moto Trola", 135, false],
    [3, "Smart TV Filips 43", 190, true],
    [4, "Sorny PS 7", 215, true],
];

/*
Tareas:
    Sabri -> Eliminar
    Nil -> Confirmar
    Tefi -> Vaciar
    Noe -> Cancelar
*/

let carrito = [];
let descuento = 0.2; // 20%
let accion = "";

const agregarProducto = (idProducto) => {
    debugger;
    let productoExistente = false;

    for (let i = 0; i < productos.length; i++) {

        for (let j = 0; j < productos[i].length; j++) {

            /*
            Si el producto existe, preguntar cuantas unidades va a llevar del producto y agregarlo al carrito
            Si el producto ya se encontraba en el carrito, debe incrementar la cantidad de unidades que está comprando
            */
            if (productos[i][j] === idProducto) {
                productoExistente = true;
                let cantidad = prompt("¿cuanto quere agregar wachen?");

                // Agregamos al carrito las cantidades que el wachin quiera.
                for (let k = 1; k <= cantidad; k++) {
                    carrito.push(productos[i]);
                }
            }
        }
    }

    // Si el producto no existe debe mostrar un mensaje informándolo
    if (!productoExistente) {
        alert("Che wacho el producto no existe");
    }

    //console.log(mostrarProductos(carrito));
}

const mostrarDetalle = () => {

}

const contarTotalDeProductos = carritoDeCompra => carritoDeCompra.length;

const subtotalDeCompra = carritoDeCompra => {
    let subTotal = 0;

    for (let i = 0; i < carritoDeCompra.length; i++) {
        subTotal += carritoDeCompra[i][2];
    }

    return subTotal;
}

const totalDescuento = carritoDeCompra => {
    let subTotal = 0;

    for (let i = 0; i < carritoDeCompra.length; i++) {
        // el indice 3, es donde esta si tiene o no descuento
        if (carritoDeCompra[i][3]) {
            // en el indice 2, esta el precio
            subTotal += carritoDeCompra[i][2];
        }
    }

    return subTotal * descuento;
}

const ObtenerCantidadDeProductos = (carritoDeCompra) => {
    debugger;
    let cantidad = 0;

    for (let i = 0; i < carritoDeCompra.length; i++) {
        for (let j = 0; j < carritoDeCompra[i].length; j++) {

            if (carritoDeCompra[i][j] == carritoDeCompra[i][0]) {
                cantidad += 1;
            }
        }
    }

    return cantidad;
}

const mostrarProductos = carritoDeCompra => {
    debugger;
    let cadena = "";
    let cantidad = 0;

    /*
    carrito = [
        [2, "Celular Moto Trola", 135, false], 0 (i)
        [2, "Celular Moto Trola", 135, false]  1 (i)
    ]
    */
    for (let i = 0; i < carritoDeCompra.length; i++) {
        for (let j = 0; j < carritoDeCompra[i].length; j++) {

            if (carritoDeCompra[i][j] == carritoDeCompra[i][0]) {
                cantidad += 1;
                break;
            }
        }
        cadena += `
                    👤 NOMBRE: ${productos[i][1]}
                    PRECIO: $ ${productos[i][2]}
                    CANTIDAD: ${cantidad}
                    SUBTOTAL: ${cantidad * oductos[i][2]} 
                    ---------------------
                    `;
    }

    alert(cadena);
}
// mostrarProductos: recibe el array del carrito de compras y muestra el listado de productos con los siguientes datos: nombre del producto, precio, cantidad y subtotal (precio x cantidad)

/*
Mostrar Compra
Mostrar el detalle de la compra con:
nombre del producto, precio, cantidad y subtotal (precio x cantidad)
cantidad total de productos
total (suma de subtotales)
Luego debe llevar al menú de operaciones
*/
while (accion.toUpperCase() !== "COMPRAOK") {

    if (accion === "") {
        accion = prompt(`--------------------------------------------
                            ⚙️ SELECCIONE UNA OPERACIÓN
                          --------------------------------------------
                        ➡️ [AGREGAR] productos a nuestro carrito
                        ➡️ [MOSTRAR] el detalle de la compra
                        ➡️ [ELIMINAR] productos 
                        ➡️ [VACIAR] el carrito 
                        ➡️ [CONFIRMAR] la compra
                        ➡️ [CANCELAR] la compra`);

        if (accion != null && accion != "") {
            accion.toUpperCase();
        }
    }

    if (accion.toUpperCase() === "AGREGAR") {
        // Mostramos todos los productos
        let cadena = "";
        for (let i = 0; i < productos.length; i++) {
            cadena += `
                       🆔 ID: ${productos[i][0]} 
                       👤 NOMBRE: ${productos[i][1]}
                       👤 PRECIO: ${productos[i][2]}
                       ---------------------
                       `;
        }

        let id = Number(prompt("Por favor ingrese el ID del producto a agregar al carrito"));

        agregarProducto(id);

        // A continuación debe pedir si se desea realizar nuevamente el procedimiento
        let confirmacion = prompt("quere volve a compra? PIOLA/NAH");

        //Si la respuesta es afirmativa debe volver a realizar el procedimiento
        if (confirmacion == "PIOLA") {
            accion = "AGREGAR";
        } else {
            //Si la respuesta es negativa debe llevar al menú de operaciones
            accion = "";
        }

    }

}