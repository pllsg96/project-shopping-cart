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

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const clickedItem = event.currentTarget;
  // console.log(clickedItem);
  clickedItem.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

//----------------------------------------------------------------
// Bloco para caso haja mudança no acrescimo ou decrescimo de elementos no carrinho

const checkDataInCart = () => {
  const theCart = document.getElementsByClassName('cart__items')[0];
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
const toCart = (id, title, price) => {
  x = {
    sku: id,
    name: title,
    salePrice: price,
  };
  const father = document.getElementsByClassName('cart__items')[0];
  father.appendChild(createCartItemElement(x));
};

const catchDataItem = (data) => {
  const { id, title, price } = data;
  toCart(id, title, price);
};

const fetchItemData = async (selectedItem) => {
  const data = await fetchItem(selectedItem);
  catchDataItem(data);
};
//----------------------------------------------------------------
// Adiciona eventListener aos botões "Adiciona ao carrinho" dos elementos carregados na página
const createOnCart = (event) => {
  const clickedItem = event.currentTarget;
  const idSelectedItem = getSkuFromProductItem(clickedItem);
  fetchItemData(idSelectedItem);
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
const startSetup = async () => {
  await fetchProductsData();
  clickedInPage();
  clickedInCart();
};

window.onload = () => {
  startSetup();
};
