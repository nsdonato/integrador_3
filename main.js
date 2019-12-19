let productos = [
    [1, "Notebook Lenobo S400", 100, true],
    [2, "Celular Moto Trola", 135, false],
    [3, "Smart TV Filips 43", 190, true],
    [4, "Sorny PS 7", 215, true],
];

let carrito = [];
let descuento = 0.2; // 20%
let accion = "";
//let totalSumaSubtotales = 0;
let carritoSubTotal = [];

const agregarProducto = (idProducto) => {

    let productoExistente = false;

    for (let i = 0; i < productos.length; i++) {

        for (let j = 0; j < productos[i].length; j++) {

            /*
            Si el producto existe, preguntar cuantas unidades va a llevar del producto y agregarlo al carrito
            Si el producto ya se encontraba en el carrito, debe incrementar la cantidad de unidades que está comprando
            */
            if (productos[i][j] === idProducto) {
                productoExistente = true;
                let cantidad = prompt("➕ ¿cuanto quere agregar wachen?");

                // Agregamos al carrito las cantidades que el wachin quiera.
                for (let k = 1; k <= cantidad; k++) {
                    carrito.push(productos[i]);
                }
            }
        }
    }

    // Si el producto no existe debe mostrar un mensaje informándolo
    if (!productoExistente) {
        alert("⚠️Che wacho el producto no existe");
    }
}

const mostrarDetalle = (carrito) => {

    let detalle = `${mostrarProductos(carrito)}
    Total de productos: ${ contarTotalDeProductos(carrito)}
    Total: $ ${totalSumaSubtotales()}`;
    accion = "";

    return detalle;
}

const mostrarDetalleConDescuento = (carritoDeCompras) => {

    // tenemos que mostrar de los productos del carrito 
    return `${mostrarDetalle(carritoDeCompras)}
            ${totalDescuento(carritoDeCompras)}
            ${totalSumaSubtotales() - totalDescuento(carritoDeCompras)}`;
}

const totalSumaSubtotales = () => {
    debugger;
    let total = 0;

    for (let i = 0; i < carritoSubTotal.length; i++) {
        total += carritoSubTotal[i];
    }

    return total;
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

    // Declaro e inicializo las variables
    let cadena = "";
    let cadenaFinal = "";
    let cantidad = 0;
    let idActual = 0;
    let idIngresado = 0;
    let subtotal = 0;

    for (let i = 0; i < carritoDeCompra.length; i++) {

        // Me quedo con el id actual
        idActual = carritoDeCompra[i][0];

        // Reinicializo (limpio) las variables solo si el id actual es diferente al que nos guardamos anteriormente
        if (idIngresado !== idActual) {
            // Guardo lo que tenemos actualmente, en la cadena que finalmente vamos a mostrar.
            cadenaFinal += cadena;
            // Limpio las variables auxiliares
            cadena = "";
            cantidad = 0;
        }

        for (let j = 0; j < carritoDeCompra[i].length; j++) {

            // Verifico si existe ese id, dentro del array 
            if (idActual === carritoDeCompra[i][j]) {
                cantidad += 1;
                idIngresado = idActual;
            }
        }

        // Si ya me había guardado la info, la piso para actualizar la cantidad y el subtotal
        if (idActual === idIngresado) {

            subtotal = cantidad * carritoDeCompra[i][2];

            cadena = `
👤 NOMBRE: ${carritoDeCompra[i][1]}
💲 PRECIO: $ ${carritoDeCompra[i][2]}
🔢 CANTIDAD: ${cantidad}
💰 SUBTOTAL: $ ${subtotal} 
---------------------`;

            // Si no hay nada, lo agrego
            if (carritoSubTotal.length == 0) {

                let add = [carritoDeCompra[i][0], subtotal];
                carritoSubTotal.push(add);

            } else {

                // Si hay algo, verifico que si es el mismo id, piso la info para actualizar el subtotal, sino, lo agrego porque es uno nuevo que tenemos que guardar.
                for (let x = 0; x < carritoSubTotal.length; x++) {

                    if (carritoSubTotal[x][0] === idIngresado) { // hay que ver bien acá porque vuelve agregar cuando no deberia, deberia pisar
                        carritoSubTotal[x] = [idActual, subtotal];
                        break;
                    }
                    else {
                        let add = [carritoDeCompra[i][0], subtotal];
                        carritoSubTotal.push(add);
                    }

                }
            }
        }
    }

    cadenaFinal += cadena;
    return cadenaFinal;
}

const codigoDeDescuento = () => {
    let tieneCodigo = false;
    let codigoCorrecto = "REPIOLA"
    let codigo = prompt(`Tenes codigo de descuento?`);

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

    for (let i = 0; i < carrito.length; i++) {

        if (repetirOperacion == "NAH") {
            accion = "";
            break;
        }

        for (let j = 0; j < carrito[i].length; j++) {

            /*
            //Si el producto existe y está en el carrito debe mostrar los datos del producto (nombre y cantidad a comprar) y preguntar si desea confirmar la operación
            */
            if (carrito[i][j] === idProducto) {

                let datosDelProducto = prompt(`❗ Estos son los datos del producto que quere' borrar:
                 ${carrito[i][1]}
                ¿Desea confirmar? 
                 ✔️PIOLA/❌NAH`)

                //Si la respuesta es afirmativa debe eliminar el producto del carrito y mostrar un mensaje de éxito
                if (datosDelProducto === "PIOLA") {

                    carrito.splice(i, 1);

                    alert("✔️ La operación fue realizada éxitosamente");

                    repetirOperacion = prompt(`Quere' eliminar algo más? 
                    ✔️PIOLA/❌NAH`);

                    if (repetirOperacion === "NAH") {

                        accion = "";
                        break;

                    } else if (repetirOperacion !== "PIOLA") {

                        alert(`
                        🚫 Opción inválida
                        🙏 Por favor, ingresar una operación correcta`);

                    } else if (repetirOperacion === "PIOLA") {

                        if (carrito.length == 0) {
                            alert(`La operación no puede repetirse, todos los productos fueron eliminados`);
                            accion = "";
                            break;
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
                break;
            }
        }
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

while (accion.toUpperCase() !== "SALIR") {

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
            accion.toUpperCase();
        }
    }

    if (accion.toUpperCase() === "AGREGAR") {

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

        // A continuación debe pedir si se desea realizar nuevamente el procedimiento
        let confirmacion = prompt("💸 quere volve a compra? ✔️PIOLA/❌NAH");

        // Si la respuesta es afirmativa debe volver a realizar el procedimiento
        if (confirmacion == "PIOLA") {
            accion = "AGREGAR";
        } else {
            //Si la respuesta es negativa debe llevar al menú de operaciones
            accion = "";
        }

    } else if (accion.toUpperCase() === `CONFIRMAR`) {

        if (carrito.length >= 1) {

            // Muestro la información del producto
            alert(`
            ${mostrarDetalle(carrito)}
            `);

            // Preguntar si tiene un codigo de descuento
            let tieneDescuento = codigoDeDescuento();

            // Mostrar detalle de la compra pero con el descuento agregado
            if (tieneDescuento) {

                mostrarDetalleConDescuento(carrito);

            } else {

                alert(`
                ${mostrarDetalle(carrito)}
                `);
            }

            let confirmarCompra = prompt("Quere confirmar la compra wacho?");

            if (confirmarCompra === "SI") {
                alert("Te compraste todo chinwenwencha, nos vimos en disney");
            } else {
                accion = "";
            }


        } else {

            alert("No hay productos en tu carrito wacho");
            accion = "";

        }



    } else if (accion.toUpperCase() === "ELIMINAR") {

        if (carrito.length >= 1) {

            let id = Number(prompt("🙏🏻Por favor ingresa el 🆔 del producto que quere' eliminar wacho"));
            eliminarProducto(id);

        } else {

            alert("El carrito no tiene productos.")
            accion = "";
        }


    } else if (accion.toUpperCase() === "CANCELAR") {

        let confirmacion = prompt("🚪🚶‍♂️¿De verdad te quere' ir?  ✔️PIOLA/❌NAH");
        cancelarCompra(confirmacion);

    } else if (accion.toUpperCase() === "VACIAR") {

        let confirmarVaciar = prompt("Desea eliminar todos los productos?");

        if (confirmarVaciar === "SI") {

            vaciarCarrito(carrito);
            alert("Se eliminaron lo´ producto´ wachen");

        }
        else {
            alert("La operación fue #cancelADA")
        }
        accion = ""
    }
}