const productos = [
    {
        nombre: "Lámpara Colgante Minimalista",
        precio: 38000,
        imagen: "./img/lampara-techo.png",
        envioGratis: false
    },
    {
        nombre: "Lámpara de Techo Moderna",
        precio: 100000,
        imagen: "./img/lampara-techo-2.png",
        envioGratis: true
    },
    {
        nombre: "Vela Aromática de Jazmín",
        precio: 18000,
        imagen: "./img/vela-jazmin.png",
        envioGratis: false
    },
    {
        nombre: "Vela Aromática de Vainilla",
        precio: 25000,
        imagen: "./img/vela-vainilla.png",
        envioGratis: false
    },
    {
        nombre: "Planta de interior",
        precio: 23000,
        imagen: "./img/planta-interior.png",
        envioGratis: false
    },
    {
        nombre: "Cuadro Blanco y Negro",
        precio: 27000,
        imagen: "./img/cuadro-blanco-negro.png",
        envioGratis: false
    }
];
const contenedor = document.querySelector(".product-grid");
const inputBusqueda = document.querySelector("#filter-busqueda");
const checkEnvio = document.querySelector("#filter-envio");
const selectOrden = document.querySelector("#order-price");

function renderProductos(lista) {
    contenedor.innerHTML = "";
    lista.forEach((producto) => {
        const card = document.createElement("article");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>$${producto.precio.toLocaleString()}</p>
            <button>¡Lo quiero!</button>
        `;
        contenedor.appendChild(card);
    });
}

function filtrarYOrdenarProductos() {
    if (!contenedor) return;

    const texto = inputBusqueda.value.toLowerCase();
    const envio = checkEnvio.checked;
    const orden = selectOrden.value;

    let productosFiltrados = productos.filter(producto => {
        const coincideTexto = producto.nombre.toLowerCase().includes(texto);
        const coincideEnvio = !envio || producto.envioGratis;
        return coincideTexto && coincideEnvio;
    });

    if (orden === "asc") {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (orden === "desc") {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    renderProductos(productosFiltrados);
}

if (contenedor) {
    renderProductos(productos);
    inputBusqueda.addEventListener("input", filtrarYOrdenarProductos);
    checkEnvio.addEventListener("change", filtrarYOrdenarProductos);
    selectOrden.addEventListener("change", filtrarYOrdenarProductos);
}