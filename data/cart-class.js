import { getDeliveryOption } from "./deliveryoptions.js";

//class is just a better way to generate objects in object oriented programming
class Cart {
  cartItems;
  #localStorageKey;
  //adding # sign makes a property a private property and now it cannot be accessed outside the class

  // constructor is a block of code which we run to provide setup values to the class

  constructor (localStorageKey) {
    this.#localStorageKey = localStorageKey;

    this.#loadFromStorage();
  }


  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
    if (!this.cartItems) {
      this.cartItems = [{
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

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart (productId , selectedValue) {
  
    let matchItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchItem = cartItem;
      }
    });
  
    if (matchItem) {
      matchItem.quantity += selectedValue;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: selectedValue,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  calculateCartQuantity() {
  
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        cartItem.quantity = newQuantity;
      }
    });
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchItem;
  
    if (!getDeliveryOption(deliveryOptionId)) {
      return;
    }
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchItem = cartItem;
        matchItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
      } else {
        return;
      }
    });
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart)
console.log(businessCart)

console.log(businessCart instanceof Cart);