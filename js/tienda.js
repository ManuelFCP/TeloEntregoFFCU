const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButtons = document.querySelectorAll('.comprarBtn');
comprarButtons.forEach((comprarButton) => {
  comprarButton.addEventListener('click', comprarClicked);
});

const comprarButton = document.querySelector('.comprarButton');
if (comprarButton) {
  comprarButton.addEventListener('click', comprarButtonClicked);
}

const confirmarCompraButton = document.querySelector('#confirmarCompra');
if (confirmarCompraButton) {
  confirmarCompraButton.addEventListener('click', confirmarCompraClicked);
}

const cantidadInput = document.getElementById('cantidad');
if (cantidadInput) {
  cantidadInput.addEventListener('input', updateTotal);
}
const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function comprarClicked(event) {
  const button = event.target;
  const item = button.closest('.item') || button.closest('.single_menu');

  let itemTitle, itemPrice;

  if (item.classList.contains('item')) {
    // Estructura de pizzas.html
    itemTitle = item.querySelector('.item-title').textContent;
    itemPrice = item.querySelector('.item-price').textContent;
  } else if (item.classList.contains('single_menu')) {
    // Estructura de hamburguesas.html
    const h4 = item.querySelector('h4');
    itemTitle = h4.textContent.replace(/\d+Bs$/, '').trim(); // Remover precio del título
    itemPrice = h4.querySelector('span').textContent;
  }

  document.getElementById('producto').value = itemTitle;
  document.getElementById('precio').value = itemPrice;
  document.getElementById('cantidad').value = 1;
  updateTotal();
}

function updateTotal() {
  const precioEl = document.getElementById('precio');
  const cantidadEl = document.getElementById('cantidad');
  const totalPagarEl = document.getElementById('totalPagar');

  if (!precioEl || !cantidadEl || !totalPagarEl) return;

  const precioValue = parseFloat(precioEl.value);
  const cantidadValue = parseInt(cantidadEl.value);

  if (!isNaN(precioValue) && !isNaN(cantidadValue) && cantidadValue > 0) {
    const total = precioValue * cantidadValue;
    totalPagarEl.value = `${total.toFixed(2)} Bs`;
  } else {
    totalPagarEl.value = '0.00 Bs';
  }
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('€', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}€`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}

function confirmarCompraClicked() {
  const producto = document.getElementById('producto').value;
  const precio = document.getElementById('precio').value;
  const cantidad = document.getElementById('cantidad').value;
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const direccion = document.getElementById('direccion').value;
  const metodoPago = document.getElementById('metodoPago').value;
  const comentariosEl = document.getElementById('comentarios');
  const comentarios = comentariosEl ? comentariosEl.value : '';

  if (!nombre || !email || !telefono || !direccion) {
    alert('Por favor, complete todos los campos obligatorios.');
    return;
  }

  // Aquí se podría enviar los datos a un servidor, pero por ahora mostramos una alerta
  alert(`Compra confirmada:\nProducto: ${producto}\nPrecio: ${precio}\nCantidad: ${cantidad}\nMétodo de Pago: ${metodoPago}\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nDirección: ${direccion}\nComentarios: ${comentarios}`);

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('compraModal'));
  modal.hide();

  // Limpiar el formulario
  document.getElementById('compraForm').reset();
}
