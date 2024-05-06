import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import formatCurrency from "../scripts/utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { addToCart, calculateCartQuantity } from '../data/cart.js';
import { loadtrackingPage } from "./tracking.js";

async function loadPage() {

  let cartQuantity = document.querySelector('.js-cart-quantity');
  cartQuantity.innerText = calculateCartQuantity();

  await loadProductsFetch();
  let ordersHTML = '';

  orders.forEach((order) => {
    ordersHTML += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${dayjs(order.orderTime).format('MMMM D')}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
      <div class="order-details-grid js-order-details-grid">
      ${loadProduct(order)}
      </div>
    </div>
    `
  });

  function loadProduct(order) {
    let productHTML = '';

    order.products.forEach((productDetails) => {

       const currentDate = dayjs();
       const deliveryDate = dayjs(productDetails.estimatedDeliveryTime);

       let deliverMessage;
       if (currentDate > deliveryDate) deliverMessage = 'Delivered on:'
        else deliverMessage = 'Arriving on:'


      const orderedProduct = getProduct(productDetails.productId);
      productHTML += `
      <div class="product-image-container">
        <img src="${orderedProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${orderedProduct.name}
        </div>
        <div class="product-delivery-date">
        ${ deliverMessage } ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
        </div>
        
        <div class="product-quantity">
          Quantity: ${productDetails.quantity}
        </div>

        <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${orderedProduct.id}" >
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${orderedProduct.id}">
          <button class="track-package-button js-track-package-button button-secondary" data-order-id="${order.id}">
            Track package
          </button>
        </a>
      </div>
      `
    });

    return productHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;

      addToCart( productId , 1 );

      cartQuantity.innerHTML = calculateCartQuantity();

      button.innerHTML = 'Added To Cart';

      setTimeout(() => {
        button.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `
      }, 1500);
    });
  });

  document.querySelectorAll('.js-track-package-button').forEach((button) => {
    button.addEventListener('click', () => {
      const { orderId } = button.dataset;

      orders.forEach((order) => {
        if (orderId === order.id) {
          loadtrackingPage(order);
        }
      });
    });
  });
}

loadPage();