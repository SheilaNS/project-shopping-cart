const cart = document.querySelector('.cart__items'); // cart ol
const clearCart = document.querySelector('.empty-cart'); // clear button
const priceSpan = document.querySelector('.total-price'); // span de preço
let preco = 0;

// salva o valor total do carrinho no localStorage
const savePrice = () => {
  localStorage.setItem('total', priceSpan.innerText);
};

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

// apaga o li do carrinho e subtrai o valor do item removido do valor total do preço
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cart.innerHTML);
  if (cart.childNodes.length > 0) {
  preco = Number(priceSpan.innerText);
  itemPrice = event.target.innerText;
  arrayPrice = itemPrice.split(' ');
  priceOnly = Number(arrayPrice[arrayPrice.length - 1].slice(1));
  priceSpan.innerText = +(+preco - +priceOnly).toFixed(2);
  savePrice();
  } else {
    preco = 0;
    priceSpan.innerText = preco;
    savePrice();
  }
}

// cria o item li do carrinho
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// adiciona os items do carrinho no HTML
priceSpan.innerText = preco;
const createCart = async (event) => {
  const itemObj = await fetchItem(getSkuFromProductItem(event.target.parentNode));
  const { id, title, price } = itemObj;
  cart.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  saveCartItems(cart.innerHTML);
  preco += Number(price);
  priceSpan.innerText = +preco;
  savePrice();
};

// limpa a lista de itens do carrinho, limpa o LocalStorage e zera o valor total
const clearCartItems = () => {
  localStorage.clear();
  cart.innerHTML = '';
  priceSpan.innerHTML = 0;
};
clearCart.addEventListener('click', clearCartItems);

const loadWord = document.createElement('p');
const loading = () => {
  const section = document.querySelector('.items');
  loadWord.className = 'loading';
  loadWord.innerText = 'Carregando...';
  section.appendChild(loadWord);  
};

// acessa o localStorage, adiciona o click nos itens do carrinho, cria a lista de itens do shopping e adiciona o click de adicionar no carrinho
window.onload = async () => {
  cart.innerHTML = getSavedCartItems('cartItems');
  if (!getSavedCartItems('total')) {
    priceSpan.innerHTML = 0;
  } else {
    priceSpan.innerHTML = getSavedCartItems('total');
  }
  cart.childNodes.forEach((item) => item.addEventListener('click', cartItemClickListener));
  loading();
  await sleep(1000);
  loadWord.remove();
  await showItems();
  const addButtons = document.querySelectorAll('.item__add');
  addButtons.forEach((button) => button.addEventListener('click', createCart));
};
