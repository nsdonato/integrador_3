let productos = [
    [1, "Notebook Lenobo S400", 100, true],
    [2, "Celular Moto Trola", 135, false],
    [3, "Smart TV Filips 43", 190, true],
    [4, "Sorny PS 7", 215, true],
];
//                                                0,    1  ,     2   ,    3    ,    4  ,    5
let carrito = []; // Nuestro carrito va a tener: id, nombre, cantidad, subtotal, precio, descuento
let descuento = 0.2; // 20%
let accion = "";
let carritoSubTotal = [];

const agregarProducto = (idProducto) => {
    let productoExistente = false;
    let indiceIdEnCarrito = 0;
    let subtotal = 0;
    let producto = 0;
    let productoEnCarrito = false;
    let cantidadAAgregar = 0;

    for (let i = 0; i < productos.length; i++) {

        if (idProducto === productos[i][0]) {
            productoExistente = true;

            cantidadAAgregar = Number(prompt("➕ ¿cuanto quere agregar wachen?"));

            // Verifico si el id de producto ya existe en el carrito, si existe me quedo con el id
            for (let x = 0; x < carrito.length; x++) {
                if (idProducto === carrito[x][0]) {
                    productoEnCarrito = true;
                    indiceIdEnCarrito = x;
                }
            }

            if (!productoEnCarrito) {

                subtotal = cantidadAAgregar * productos[i][2];
                producto = [productos[i][0], productos[i][1], cantidadAAgregar, subtotal, productos[i][2], productos[i][3]];
                carrito.push(producto);

            } else {

                let cantActualizada = carrito[indiceIdEnCarrito][2];
                // calculo la nueva cantidad
                cantActualizada += cantidadAAgregar;
                // con la nueva cantidad * precio para obtener el nuevo subtotal y actualizarlo.
                let subtotalActualizado = cantActualizada * carrito[indiceIdEnCarrito][4];

                carrito[indiceIdEnCarrito][2] = cantActualizada;
                carrito[indiceIdEnCarrito][3] = subtotalActualizado;
            }
        }
    }

    if (!productoExistente) {
        alert("⚠️Che wacho el producto no existe");
    }
}

const mostrarDetalle = (carrito) => {
    let detalle = `${mostrarProductos(carrito)}
Total de productos: ${ contarTotalDeProductos(carrito)}
Total: $ ${totalSumaSubtotales(carrito)}`;
    accion = "";

    return detalle;
}

const mostrarDetalleConDescuento = carritoDeCompras => {

    // tenemos que mostrar de los productos del carrito 
    let totalDesc = totalDescuento(carritoDeCompras);
    let total = totalSumaSubtotales(carritoDeCompras) - totalDesc;

    return `${mostrarDetalle(carritoDeCompras)}
Total descuento: $ ${totalDesc}
Total: $ ${total}`;
}

const totalSumaSubtotales = carritoDeCompra => {
    let total = 0;

    for (let i = 0; i < carritoDeCompra.length; i++) {
        total += carritoDeCompra[i][3];
    }

    return total;
}

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
        // el indice 5, es donde esta si tiene o no descuento
        if (carritoDeCompra[i][5]) {
            // en el indice 2, esta el precio
            subTotal += carritoDeCompra[i][4];
        }
    }

    return (subTotal * descuento).toFixed(2);
}

const contarTotalDeProductos = (carritoDeCompra) => {
    let cantidad = 0;

    for (let i = 0; i < carritoDeCompra.length; i++) {
        cantidad += carritoDeCompra[i][2];
    }

    return cantidad;
}

const mostrarProductos = carritoDeCompra => {
    let cadena = "";

    for (let x = 0; x < carritoDeCompra.length; x++) {
        cadena += `
👤 NOMBRE: ${carritoDeCompra[x][1]}
💲 PRECIO: $ ${carritoDeCompra[x][4]}
🔢 CANTIDAD: ${carritoDeCompra[x][2]}
💰 SUBTOTAL: $ ${carritoDeCompra[x][3]} 
---------------------`;
    }

    return cadena;
}

const codigoDeDescuento = () => {
    let tieneCodigo = false;
    let codigoCorrecto = "REPIOLA";
    let codigo = prompt(`Tenes codigo de descuento? SI/NO`).toUpperCase();

    if (codigo == "SI") {

        let ingresaCodigo = prompt(`Ingresa aqui tu codigo:`);
        if (ingresaCodigo == codigoCorrecto) {
            alert(`El codigo es correcto! Tenes un 20% de descuento`);
            tieneCodigo = true;
        }
        else {
            alert(`No ingresaste un codigo correcto`);
        }
    }
    else {
        alert(`Lo siento, no tienes codigo`);
    }

    return tieneCodigo;
}

const confirmarCompra = () => {

}

const eliminarProducto = (idProducto) => {
    let repetirOperacion = ""
    let encontreProducto = false;
    let indiceProductoEncontrado = 0;

    for (let i = 0; i < carrito.length; i++) {

        if (repetirOperacion == "NAH") {
            accion = "";
            break;
        }

        /* Si el producto existe y está en el carrito debe mostrar los datos del producto (nombre y cantidad a comprar) y preguntar si desea confirmar la operación */
        if (carrito[i][0] === idProducto) {
            encontreProducto = true;
            indiceProductoEncontrado = i;
            break;
        }
    }

    if (encontreProducto) {
        let datosDelProducto = prompt(`❗ Estos son los datos del producto que quere' borrar:
            ${carrito[indiceProductoEncontrado][1]}
            ${carrito[indiceProductoEncontrado][2]}
           ¿Desea confirmar? 
            ✔️PIOLA/❌NAH`)

        //Si la respuesta es afirmativa debe eliminar el producto del carrito y mostrar un mensaje de éxito
        if (datosDelProducto === "PIOLA") {

            carrito.splice(indiceProductoEncontrado, 1);

            alert("✔️ La operación fue realizada éxitosamente");

            repetirOperacion = prompt(`Quere' eliminar algo más? 
               ✔️PIOLA/❌NAH`);

            if (repetirOperacion === "NAH") {

                accion = "";

            } else if (repetirOperacion !== "PIOLA") {

                alert(`
                   🚫 Opción inválida
                   🙏 Por favor, ingresar una operación correcta`);

            } else if (repetirOperacion === "PIOLA") {

                if (carrito.length == 0) {
                    alert(`La operación no puede repetirse, todos los productos fueron eliminados`);
                    accion = "";
                }
            }

        } else {

            //Si la respuesta es negativa debe mostrar un mensaje indicando que la operación fue cancelada
            alert("❌ Operación cancelada")
            //Si la respuesta es negativa debe llevar al menú de operaciones
            accion = "";

        }

    } else {
        alert("Que flashea wacho ese id no existe culiau");
        repetirOperacion = "NAH";
    }
}


const cancelarCompra = (respuesta) => {

    if (respuesta == "PIOLA") {
        alert("Chau wacho")
        accion = "SALIR";
    }
    else {
        accion = "";
    }
}

const vaciarCarrito = (carritoDeCompra) => {
    carritoDeCompra = [];
}

while (accion !== "SALIR") {
    if (accion === "") {
        accion = prompt(`--------------------------------------------
⚙️ SELECCIONE UNA OPERACIÓN
--------------------------------------------
➕ [AGREGAR] productos a nuestro carrito
📑 [MOSTRAR] el detalle de la compra
✂️ [ELIMINAR] productos 
🗑️[VACIAR] el carrito 
✔️[CONFIRMAR] la compra
🚪 [CANCELAR] la compra`);

        if (accion != null && accion != "") {
            accion = accion.toUpperCase();
        }
    }

    if (accion === "AGREGAR") {

        let cadena = "";
        // Mostramos todos los productos
        for (let i = 0; i < productos.length; i++) {
            cadena += `
🆔 ID: ${productos[i][0]} 
👤 NOMBRE: ${productos[i][1]}
💲 PRECIO: ${productos[i][2]}
---------------------
`;
        }

        let id = Number(prompt("🙏🏻Por favor ingrese el 🆔 del producto a agregar al carrito"));
        agregarProducto(id);

        let confirmacion = prompt("💸 quere volve a compra? ✔️PIOLA / ❌NAH");

        if (confirmacion == "PIOLA") {
            accion = "AGREGAR";
        } else {
            accion = "";
        }

    } else if (accion === `CONFIRMAR`) {

        if (carrito.length >= 1) {

            // Muestro la información del producto
            alert(`
            ${mostrarDetalle(carrito)}
            `);

            debugger;
            // Preguntar si tiene un codigo de descuento
            if (codigoDeDescuento()) {

                alert(`${mostrarDetalleConDescuento(carrito)}`);

            } else {

                alert(`
                ${ mostrarDetalle(carrito)}
                    `);
            }

            let confirmarCompra = prompt("Quere confirmar la compra wacho? SI/NO");

            if (confirmarCompra === "SI") {
                alert("Te compraste todo chinwenwencha, nos vimos en disney");
            } else {
                accion = "";
            }

        } else {

            alert("No hay productos en tu carrito wacho");
            accion = "";

        }

    } else if (accion === "ELIMINAR") {

        if (carrito.length >= 1) {

            let id = Number(prompt("🙏🏻Por favor ingresa el 🆔 del producto que quere' eliminar wacho"));
            eliminarProducto(id);

        } else {
            alert("El carrito no tiene productos.");
            accion = "";
        }


    } else if (accion === "CANCELAR") {

        let confirmacion = prompt("🚪🚶‍♂️¿De verdad te quere' ir?  ✔️PIOLA/❌NAH").toUpperCase();
        cancelarCompra(confirmacion);

    } else if (accion === "VACIAR") {

        let confirmarVaciar = prompt("Desea eliminar todos los productos? SI/NO");

        if (confirmarVaciar === "SI") {

            vaciarCarrito(carrito);
            alert("Se eliminaron lo´ producto´ wachen");

        }
        else {
            alert("La operación fue #cancelADA");
        }
        accion = "";

    } else if (accion === "MOSTRAR") {

        if (carrito.length >= 1) {
            alert(`${mostrarDetalle(carrito)}`);

        } else {
            alert("Recatate wacho todavía no agregaste nada al chango")
        }

        accion = "";
    } else {
        accion = "";
    }
}
