const cart = document.querySelector('.cart__items'); // cart ol
const clearCart = document.querySelector('.empty-cart'); // clear button
const cartSection = document.querySelector('.cart'); // cart section

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

const showItems = async () => {
  const itemObj = await fetchProducts('computador');
  const { results } = itemObj;
  results.map((prod) => ({ sku: prod.id, name: prod.title, image: prod.thumbnail }))
    .forEach((elem) => {
    const items = document.querySelector('.items');
    items.appendChild(createProductItemElement(elem));
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const itemPrice = async (event) => {
  const itemObj = await fetchItem(getSkuFromProductItem(event.target.parentNode));
  const { price } = itemObj;
  cartSection.appendChild(createCustomElement('span', 'item-price', Number(price)));
};

const sumPrice = () => {
  const totalSpan = document.createElement('span');
  totalSpan.className = 'total-price';
  totalSpan.innerText = 0;
  cartSection.appendChild(totalSpan);
};

// const itemsPrice = document.querySelectorAll('.item-price');
// totalSpan.innerText = itemsPrice.forEach((item) => total + Number(item));

const createCart = async (event) => {
  const itemObj = await fetchItem(getSkuFromProductItem(event.target.parentNode));
  const { id, title, price } = itemObj;
  cart.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  saveCartItems(cart.innerHTML);
};

const clearCartItems = () => {
  localStorage.removeItem('cartItems');
  cart.innerHTML = '';
};

clearCart.addEventListener('click', clearCartItems);

window.onload = async () => {
  cart.innerHTML = getSavedCartItems();
  cart.childNodes.forEach((item) => item.addEventListener('click', cartItemClickListener));
  await showItems();
  const addButtons = document.querySelectorAll('.item__add');
  addButtons.forEach((button) => button.addEventListener('click', createCart));
  addButtons.forEach((button) => button.addEventListener('click', itemPrice));
  sumPrice();
};
