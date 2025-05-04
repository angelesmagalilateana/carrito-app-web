const productos = [
    {
      nombre: "Lámpara Colgante Minimalista",
      precio: 38000,
      imagen: "./img/lampara-techo.png",
    },
    {
      nombre: "Lámpara de Techo Moderna",
      precio: 100000,
      imagen: "./img/lampara-techo-2.png",
    },
    {
      nombre: "Vela Aromática de Jazmín",
      precio: 18000,
      imagen: "./img/vela-jazmin.png",
    },
    {
      nombre: "Vela Aromática de Vainilla",
      precio: 25000,
      imagen: "./img/vela-vainilla.png",
    },
    {
      nombre: "Planta de interior",
      precio: 23000,
      imagen: "./img/planta-interior.png",
    },
    {
      nombre: "Cuadro Blanco y Negro",
      precio: 27000,
      imagen: "./img/cuadro-blanco-negro.png",
    },
  ];
  
  const contenedorProductos = document.querySelector('.product-grid');
  
  productos.forEach(producto => {
    const card = document.createElement('article');
    card.classList.add('product-card');
  
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h4>${producto.nombre}</h4>
      <p>$${producto.precio.toLocaleString()}</p>
      <button>¡Lo quiero!</button>
    `;
  
    contenedorProductos.appendChild(card);
  });
  