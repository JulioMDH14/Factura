let numeroFactura = 1;

        function generarFactura() {
            var serieFactura = document.getElementById("serieFactura").value;
            var fechaExpedicion = document.getElementById("fechaExpedicion").value;
            var nombreEmisor = document.getElementById("nombreEmisor").value;
            var nifEmisor = document.getElementById("nifEmisor").value;
            var direccionEmisor = document.getElementById("direccionEmisor").value;
            var nombreReceptor = document.getElementById("nombreReceptor").value;
            var nifReceptor = document.getElementById("nifReceptor").value;
            var direccionReceptor = document.getElementById("direccionReceptor").value;
            var fechaOperaciones = document.getElementById("fechaOperaciones").value;
            var productos = document.querySelectorAll(".producto");
            var subtotalP = 0;
            var facturaHTML = `
      <div class="factura-container">
        <h2>Factura</h2>
        <p>Número de Factura: ${numeroFactura}</p>
        <p>Serie: ${serieFactura}</p>
        <p>Fecha de Expedición: ${fechaExpedicion}</p>
        <hr>
        <h3>Datos del Emisor</h3>
        <p>Nombre/Razón Social: ${nombreEmisor}</p>
        <p>NIF: ${nifEmisor}</p>
        <p>Dirección: ${direccionEmisor}</p>
        <hr>
        <h3>Datos del Receptor</h3>
        <p>Nombre/Razón Social: ${nombreReceptor}</p>
        <p>NIF: ${nifReceptor}</p>
        <p>Dirección: ${direccionReceptor}</p>
        <hr>
        <h3>Detalle de Operaciones</h3>
        <p>Fecha de Operaciones: ${fechaOperaciones}</p>
    `;

            productos.forEach(function (producto) {
                var nombreProducto = producto.querySelector(".nombreProducto").value;
                var precio = parseFloat(producto.querySelector(".precio").value);
                var cantidad = parseInt(producto.querySelector(".cantidad").value);
                var tipoImpositivo = parseFloat(producto.querySelector(".tipoImpositivo").value);

                if (nombreProducto && precio && cantidad && tipoImpositivo) {
                    var subtotal = precio * cantidad;
                    var cuotaTributaria = subtotal * (tipoImpositivo / 100);
                    subtotalP += subtotal;

                    facturaHTML += `
          <p>Descripción: ${nombreProducto}</p>
          <p>Precio Unitario: ${precio.toFixed(2)}</p>
          <p>Cantidad: ${cantidad}</p>
          <p>Tipo Impositivo: ${tipoImpositivo}%</p>
          <p>Cuota Tributaria: ${cuotaTributaria.toFixed(2)}</p>
          <hr>
        `;
                }
            });

            var iva = subtotalP * 0.19;
            var total = subtotalP + iva;

            facturaHTML += `
  <div class="detalle-operaciones">
    <h3>Detalle de Operaciones</h3>
    <p>Fecha de Operaciones: ${fechaOperaciones}</p>
`;


            document.body.innerHTML = facturaHTML;
            numeroFactura++;
        }

        function agregarProducto() {
            var productosContainer = document.getElementById("productosContainer");
            var nuevoProducto = document.createElement("div");
            nuevoProducto.classList.add("producto");
            nuevoProducto.innerHTML = `
      <input type="text" class="nombreProducto" placeholder="Descripción del Producto">
      <input type="number" class="precio" placeholder="Precio Unitario">
      <input type="number" class="cantidad" placeholder="Cantidad">
      <select class="tipoImpositivo">
        <option value="21">21%</option>
        <option value="10">10%</option>
        <option value="4">4%</option>
      </select>
    `;
            productosContainer.appendChild(nuevoProducto);
        }

        window.onload = function () {
            document.getElementById("numeroFactura").value = numeroFactura;
        };