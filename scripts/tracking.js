import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { orders } from "../data/orders.js";
import { calculateCartQuantity } from "../data/cart.js";

const url = new URL(window.location.href);
url.searchParams.get('orderId');
const orderId = url.searchParams.get('orderId');
const productId  = url.searchParams.get('productId')
//console.log(url.searchParams.get('orderId'));
//console.log(url.searchParams.get('productId'));

orders.forEach((order) => {
  if (orderId === order.id) {
    loadtrackingPage(order);
  }
});


export async function loadtrackingPage (order) {

  document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

  await loadProductsFetch();

  let trackingHTML = '';

  order.products.forEach((productDetails) => {
    if (productId === productDetails.productId) {
      const orderedProduct = getProduct(productDetails.productId);
      trackingHTML = `
      <div class="delivery-date">
        Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
      </div>

      <div class="product-info">
        ${orderedProduct.name}
      </div>

      <div class="product-info">
        Quantity: ${productDetails.quantity}
      </div>

      <img class="product-image" src="${orderedProduct.image}">
      `
    }
  });

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

}

