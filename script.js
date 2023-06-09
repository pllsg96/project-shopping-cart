const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  const img = image.replace('I', 'W');

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(img));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

//----------------------------------------------------------------
// Atualiza Valor do carrinho
const attValueHTML = (valor) => {
  const roundedValor = Math.round(valor * 100) / 100;
  const htmlValor = document.createElement('h4');
  const carrinho = document.getElementsByClassName('cartValue')[0];
  htmlValor.classList.add('total-price');
  carrinho.innerHTML = '';
  htmlValor.innerText = `Total: ${roundedValor} R$`;
  carrinho.appendChild(htmlValor);
};

const totalValue = () => {
  const cartList = document.getElementsByClassName('cart__item');
  let vtotal = 0;
  for (let index = 0; index < cartList.length; index += 1) {
    const a = cartList[index].innerText.split('|');
    const b = a[2];
    const c = b.split('$');
    const d = c[1];
    vtotal += parseFloat(d);
  }
  attValueHTML(vtotal);
};
//----------------------------------------------------------------
// Bloco para caso haja mudança no acrescimo ou decrescimo de elementos no carrinho
const checkDataInCart = () => {
  const theCart = document.getElementsByClassName('cart__items')[0];
  saveCartItems(theCart);
};
//----------------------------------------------------------------

const cartItemClickListener = (event) => {
  const clickedItem = event.currentTarget;
  // console.log(clickedItem);
  clickedItem.remove();
  totalValue();
  checkDataInCart();
};

// const createCartItemElement = ({ sku, name, salePrice }) => {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// };
const createCartItemElement = ({ sku, name, salePrice, thumbnail }) => {
  const li = document.createElement('li');
  const div = document.createElement('div');
  li.className = 'cart__item';
  li.appendChild(div);
  div.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
//----------------------------------------------------------------
// Bloco fetchProduct
const cElementsWithData = (allData) => {
  const father = document.getElementsByClassName('items')[0];
  allData.forEach((unitData) => {
    const { id, title, thumbnail } = unitData;
    const x = {
      sku: id,
      name: title,
      image: thumbnail,
    };  
    father.appendChild(createProductItemElement(x));
  });
};

const catchData = (data) => {
  const allData = data.results;
  cElementsWithData(allData);
};

const fetchProductsData = async () => {
  const data = await fetchProducts('computador');
  catchData(data);
};
//----------------------------------------------------------------
// Bloco fetchItem
const toCart = (id, title, price, thumbnail) => {
  x = {
    sku: id,
    name: title,
    salePrice: price,
    image: thumbnail,
  };
  const father = document.getElementsByClassName('cart__items')[0];
  father.appendChild(createCartItemElement(x));
};

const catchDataItem = (data) => {
  const { id, title, price, thumbnail } = data;
  toCart(id, title, price, thumbnail);
};

const fetchItemData = async (selectedItem) => {
  const data = await fetchItem(selectedItem);
  catchDataItem(data);
};
//----------------------------------------------------------------
// Adiciona eventListener aos botões "Adiciona ao carrinho" dos elementos carregados na página
const createOnCart = async (event) => {
  const clickedItem = event.currentTarget;
  const idSelectedItem = getSkuFromProductItem(clickedItem);
  await fetchItemData(idSelectedItem);
  checkDataInCart();
  totalValue();
  getSavedCartItems();
};

const clickedInPage = () => {
  const allProductsOnPage = document.getElementsByClassName('item');
  for (let index = 0; index < allProductsOnPage.length; index += 1) {
    allProductsOnPage[index].addEventListener('click', createOnCart);
  }
};
//----------------------------------------------------------------
// Adiciona função que remove o item quando este for clicado dentro do carrinho.
const clickedInCart = () => {
  const allProductsOnCart = document.getElementsByClassName('cart__item');
  for (let index = 0; index < allProductsOnCart.length; index += 1) {
    allProductsOnCart[index].addEventListener('click', cartItemClickListener);
  }
};
//----------------------------------------------------------------
// Starter pack para o carrinho iniciar já com os dados anteriores ao carregamento
const gettingAllStartElements = () => {
  const x = getSavedCartItems();
  const cartStartItems = document.getElementsByClassName('cart__items')[0];
  cartStartItems.innerHTML = x;
  clickedInCart();
  totalValue();
};
//----------------------------------------------------------------
// Eventlistener do botão esvaziar carrinho
const getOutMyCart = document.getElementsByClassName('empty-cart')[0];
getOutMyCart.addEventListener('click', () => {
  const cart = document.getElementsByClassName('cart__items')[0];
  cart.innerHTML = '';
  checkDataInCart();
  totalValue();
});
//----------------------------------------------------------------
const sLoadPage = () => {
  const loadCase = document.getElementsByClassName('theLoading')[0];
  const textLoad = document.createElement('h3');
  textLoad.innerText = 'Carregando!';
  textLoad.classList.add('loading');
  loadCase.appendChild(textLoad);
};

const fLoadPage = () => {
  const loadCase = document.getElementsByClassName('theLoading')[0];
  loadCase.innerHTML = '';
};

const startSetup = async () => {
  sLoadPage();
  await fetchProductsData();
  fLoadPage();
  gettingAllStartElements();
  clickedInPage();
  clickedInCart();
};

window.onload = () => {
  startSetup();
};
