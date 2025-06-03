updateCartCount();
const API_TOKEN = 'pattqrQxTlzP29PwZ.58f51a3919b31def19da62dcfc19c8fefacfb948f5a30196e5944ebbb53d6698';
const BASE_ID = 'appQO59P9thxzyUKJ';
const TABLE_NAME = 'products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

let airtableProducts = [];

const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

const addToAirtable = async (product) => {
  const itemAirtable = { fields: product };

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemAirtable)
  });
};

const getProducts = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) return;

    const data = await response.json();

    airtableProducts = data.records.map(item => {
      const fields = item.fields;
      return {
        name: fields.name || "Sin nombre",
        price: fields.price || 0,
        image: fields.image?.[0]?.url ,
        freeShipping: fields.freeShipping || false
      };
    });

    filterAndRender();
  } catch (error) {
    console.error('Error loading products from Airtable:', error);
  }
};

const grid = document.querySelector('.product-grid');
const searchInput = document.querySelector('#input-search-products');
const deliveryFreeCheckBox = document.querySelector('#delivery-free');
const priceSortSelect = document.querySelector('#order-price');

function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');
  
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
  
    const info = document.createElement('div');
    info.classList.add('product-info');
  
    const name = document.createElement('h3');
    name.textContent = product.name;
  
    const price = document.createElement('p');
    price.textContent = `$${product.price}`;
  
    const button = document.createElement('button');
    const updateButtonState = () => {
      const inCart = cartProducts.some(p => p.name === product.name);
      if (inCart) {
        button.textContent = 'Eliminar del carrito';
        button.classList.add('button-remove');
        button.classList.remove('button-add');
      } else {
        button.textContent = 'Agregar al carrito';
        button.classList.add('button-add');
        button.classList.remove('button-remove');
      }
    };
  
    updateButtonState();
  
    button.addEventListener('click', () => {
      const index = cartProducts.findIndex(p => p.name === product.name);
      if (index === -1) {
        cartProducts.push(product);
      } else {
        cartProducts.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(cartProducts));
      updateCartCount();
      updateButtonState();
    });
  
    info.appendChild(name);
    info.appendChild(price);
  
    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(button);
  
    return card;
  }
  
  

function renderProducts(list) {
  grid.innerHTML = '';
  list.forEach(product => {
    const card = createProductCard(product);
    grid.appendChild(card);
  });
}

function filterAndRender() {
  const text = searchInput.value.toLowerCase();
  const onlyFreeShipping = deliveryFreeCheckBox.checked;
  const order = priceSortSelect.value;

  let filtered = airtableProducts.filter(product => {
    const matchesText = product.name.toLowerCase().includes(text);
    const matchesShipping = !onlyFreeShipping || product.freeShipping;
    return matchesText && matchesShipping;
  });

  if (order === 'asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (order === 'desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
      cartCountEl.textContent = cart.length;
    }
  }

  

searchInput.addEventListener('input', filterAndRender);
deliveryFreeCheckBox.addEventListener('change', filterAndRender);
priceSortSelect.addEventListener('change', filterAndRender);

getProducts();

  