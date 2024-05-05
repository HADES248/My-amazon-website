import { getDeliveryOption } from "./deliveryoptions.js";
export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function calculateCartQuantity() {

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}


export function addToCart (productId , selectedValue) {

  let matchItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchItem = cartItem;
    }
  });

  if (matchItem) {
    matchItem.quantity += selectedValue;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedValue,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      cartItem.quantity = newQuantity;
    }
  });
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function resetCart() {
  const newCart = [];
  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchItem;

  if (!getDeliveryOption(deliveryOptionId)) {
    return;
  }

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchItem = cartItem;
      matchItem.deliveryOptionId = deliveryOptionId;
      saveToStorage();
    } else {
      return;
    }
  });
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);

}
