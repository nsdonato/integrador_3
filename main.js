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

    // Declaro e inicializo las variables
    let cadena = "";
    let cadenaFinal = "";
    let cantidad = 0;
    let idActual = 0;
    let idIngresado = 0;

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
            cadena = `
                    👤 NOMBRE: ${carritoDeCompra[i][1]}
                    💲 PRECIO: $ ${carritoDeCompra[i][2]}
                    🔢 CANTIDAD: ${cantidad}
                    💰 SUBTOTAL: ${cantidad * carritoDeCompra[i][2]} 
                    ---------------------
                    `;
        }
    }

    cadenaFinal += cadena;
    alert(cadenaFinal);
}

/*
Mostrar Compra
Mostrar el detalle de la compra con:
nombre del producto, precio, cantidad y subtotal (precio x cantidad)
cantidad total de productos
total (suma de subtotales)
Luego debe llevar al menú de operaciones
*/

const codigoDeDescuento = () => {
    let codigoCorrecto = "REPIOLA"
    let tieneCodigo = prompt(`Tenes codigo de descuento?`)
    if (tieneCodigo == "SI") {
        let ingresaCodigo = prompt(`Ingresa aqui tu codigo:`)
        if (ingresaCodigo == codigoCorrecto) {
            alert(`El codigo es correcto! Tenes un 20% de descuento`)
        }
        else {
            alert(`No ingresaste un codigo correcto`)
        }
    }
    else {
        alert(`Lo siento, no tienes codigo`)
    }

}

const confirmarCompra = () => {

}

const eliminarProducto = (idProducto) => {
    debugger;
    let productoAEliminar = false;
    let datosDelProducto = ""
    let respuestaEliminacion = ""

    for (i = 0; datosDelProducto != "NAH" && respuestaEliminacion != "NAH"; i++) {
        for (let i = 0; i < carrito.length; i++) {

            for (let j = 0; j < carrito[i].length; j++) {

                /*
                //Si el producto existe y está en el carrito debe mostrar los datos del producto (nombre y cantidad a comprar) y preguntar si desea confirmar la operación
                */
                if (carrito[i][j] === idProducto) {
                    productoAEliminar = true;
                    let datosDelProducto = prompt(`❗ Estos son los datos del producto que quere' borrar:
                 ${carrito[idProducto][1]}
                ¿Desea confirmar? 
                 ✔️PIOLA/❌NAH`)
                    //Si la respuesta es afirmativa debe eliminar el producto del carrito y mostrar un mensaje de éxito
                    if (datosDelProducto === "PIOLA") {
                        carrito.splice(i, 1);
                        alert("✔️ La operación fue realizada éxitosamente")
                        respuestaEliminacion = prompt(`Quere' eliminar algo más? 
                    ✔️PIOLA/❌NAH`)
                        if (respuestaEliminacion === "PIOLA") {
                            accion = "ELIMINAR"
                        }

                    }
                    //Si la respuesta es negativa debe mostrar un mensaje indicando que la operación fue cancelada

                    else {
                        alert("❌ Operación cancelada")
                        //Si la respuesta es negativa debe llevar al menú de operaciones
                        accion = "";

                    }



                }

            }
        }

    }


}

const cancelarCompra = (respuesta) => {

    if (confirmacion == "RE") {
        alert("Chau wacho")
    }
    else {
        accion = "";
    }

}


while (accion.toUpperCase() !== "COMPRAOK") {

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
        // Mostramos todos los productos
        let cadena = "";
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

        //Si la respuesta es afirmativa debe volver a realizar el procedimiento
        if (confirmacion == "PIOLA") {
            accion = "AGREGAR";
        } else {
            //Si la respuesta es negativa debe llevar al menú de operaciones
            accion = "";
        }

    }
    if (accion.toUpperCase() === `CONFIRMAR`) {
        codigoDeDescuento()
        accion = "";

    }


    if (accion.toUpperCase() === "ELIMINAR") {
        let id = Number(prompt("🙏🏻Por favor ingresa el 🆔 del producto que quere' eliminar wacho"));

        eliminarProducto(id);


    }


    if (accion.toUpperCase() === "CANCELAR") {
        let confirmacion = prompt("🚪🚶‍♂️¿De verdad te quere' ir?  ✔️PIOLA/❌NAH");

        cancelarProducto(confirmacion);

    }

}
