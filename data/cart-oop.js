import { getDeliveryOption } from "./deliveryoptions.js";

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
  
  //this is a js function which gives the current object 
     loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
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
    },
  
  
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
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
    },
  
    calculateCartQuantity() {
  
      let cartQuantity = 0;
    
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
    
      return cartQuantity;
    },
  
     updateQuantity(productId, newQuantity) {
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          cartItem.quantity = newQuantity;
        }
      });
      this.saveToStorage();
    },
  
    removeFromCart(productId) {
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToStorage();
    },
  
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

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart)
console.log(businessCart)
