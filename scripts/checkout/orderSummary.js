import {cart , removeFromCart , updateQuantity , updateDeliveryOption} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions , getDeliveryOption , calculateDeliveryDate } from '../../data/deliveryoptions.js';
import { renderPaymentSummary } from "./paymentSummary.js";
import { updateCartQuantity } from "./checkoutHeader.js";

export function renderOrderSummary() {

  let cartSummaryHTML = '';

  updateCartQuantity();

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

  cartSummaryHTML += `
      <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${calculateDeliveryDate(deliveryOption)}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                Update
              </span>

              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>

              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {

      const priceString = deliveryOption.priceCents === 0 
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option js-delivery-option-id-${matchingProduct.id}-${deliveryOption.id}"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input js-delivery-option-input-id-${matchingProduct.id}-${deliveryOption.id}"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${calculateDeliveryDate(deliveryOption)}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });

    updateCartQuantity();

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-update-quantity-link').forEach((update) => {
    update.addEventListener('click', () => {
      const {productId} = update.dataset;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      container.classList.add("is-editing-quantity");

      const input = document.querySelector(`.js-quantity-input-${productId}`);

      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const value = Number(input.value);

          if (value <= 0 || value >= 1000) {
            alert('the quantity can be 1 or more than 1000');
            return;
          }
      
          updateQuantity(productId , value);
      
          container.classList.remove("is-editing-quantity");
      
          const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      
          quantityLabel.innerHTML = value;
      
          updateCartQuantity();
          renderPaymentSummary();
        }
      });
    });
  });


  document.querySelectorAll('.js-save-quantity-link').forEach((save) => {
    save.addEventListener('click', () => {
      const {productId} = save.dataset;

      const inputValue = document.querySelector(`.js-quantity-input-${productId}`);

      const inputQuantity = Number(inputValue.value);

      if (inputQuantity !== Number(inputQuantity)) {
        alert("The value is invalid");
        return;
      }

      if (inputQuantity <= 0 || inputQuantity >= 1000) {
        alert('the quantity can be 1 or more than 1000');
        return;
      }

      updateQuantity(productId , inputQuantity);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      container.classList.remove("is-editing-quantity");

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

      quantityLabel.innerHTML = inputQuantity;
      
      updateCartQuantity();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;
      removeFromCart(productId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
