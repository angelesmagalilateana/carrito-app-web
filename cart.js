updateCartCount();

const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

function createProductCartCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement('h3');
    title.textContent = product.name;

    const price = document.createElement('p');
    price.textContent = `$${product.price.toLocaleString()}`;

    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.addEventListener('click', () => {
        const index = cartProducts.findIndex(p => p.name === product.name);
        if (index !== -1) {
            cartProducts.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            renderCartProducts(cartProducts);
            updateCartCount(); // actualiza el número del carrito
        }
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

function renderCartProducts(list) {
    const cartGrid = document.querySelector('.product-grid');
    cartGrid.innerHTML = '';
    list.forEach(product => {
        const card = createProductCartCard(product);
        cartGrid.appendChild(card);
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cart.length;
    }
}

renderCartProducts(cartProducts);
