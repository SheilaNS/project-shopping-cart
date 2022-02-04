const cart = document.querySelector('.cart__items'); // cart ol
const clearCart = document.querySelector('.empty-cart'); // clear button
const priceSpan = document.querySelector('.total-price'); // span de preço
let preco = 0;

// cria o elemento da imagem
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// cria um elemento HTML
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// cria os items da section items
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

// adiciona os items no HTML
const showItems = async () => {
  const itemObj = await fetchProducts('computador');
  const { results } = itemObj;
  results.map((prod) => ({ sku: prod.id, name: prod.title, image: prod.thumbnail }))
    .forEach((elem) => {
    const items = document.querySelector('.items');
    items.appendChild(createProductItemElement(elem));
  });
};

// seleciona o ID do item
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// apaga o li do cart
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cart.innerHTML);
  preco = Number(priceSpan.innerText);
  itemPrice = event.target.innerText;
  arrayPrice = itemPrice.split(' ');
  priceOnly = Number(arrayPrice[arrayPrice.length - 1].slice(1));
  console.log(typeof preco);
  console.log(typeof priceOnly);
  priceSpan.innerText = +(+preco - +priceOnly).toFixed(2);
}

// cria o elemento do cart
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// adiciona os items do cart no HTML
priceSpan.innerText = preco;
const createCart = async (event) => {
  const itemObj = await fetchItem(getSkuFromProductItem(event.target.parentNode));
  const { id, title, price } = itemObj;
  cart.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  saveCartItems(cart.innerHTML);
  preco += Number(price);
  priceSpan.innerText = +preco;
};

// função escutador do botão esvaziar carrinho
const clearCartItems = () => {
  localStorage.removeItem('cartItems');
  cart.innerHTML = '';
};
clearCart.addEventListener('click', clearCartItems);

// carrega a página ao atualizar
window.onload = async () => {
  cart.innerHTML = getSavedCartItems();
  cart.childNodes.forEach((item) => item.addEventListener('click', cartItemClickListener));
  await showItems();
  const addButtons = document.querySelectorAll('.item__add');
  addButtons.forEach((button) => button.addEventListener('click', createCart));
};

/* 
  requisito pede: soma dos itens no carrinho
  <div class='container-cartTitle'>
    <p class='total-price'>0</p>
  </div>
*/
