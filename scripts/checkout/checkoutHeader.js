import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  let html = `
  Checkout (<a class="return-to-home-link js-return-to-home"
  href="index.html"></a>)
  `;
  document.querySelector('.checkout-header-middle-section').innerHTML = html;
} 

export function updateCartQuantity() {
  document.querySelector('.js-return-to-home').innerHTML = `${calculateCartQuantity()} items`;
}