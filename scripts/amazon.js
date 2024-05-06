import {cart , addToCart , calculateCartQuantity} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from "./utils/money.js";


loadProducts(renderProductsGrid); //callback is used here


function renderProductsGrid() {


  let productsHTML = '';

  updateCartQuantity();

  const searchInput = document.querySelector('.js-search-bar');
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        window.location.href = `amazon.html?search=${searchInput.value}`
      }
    });

  document.querySelector('.js-search-button').addEventListener('click', () => {
    window.location.href = `amazon.html?search=${searchInput.value}`;
  });

    const url = new URL (window.location.href);

    const searchedProduct = url.searchParams.get('search');

    let filteredProducts = products;

    if (searchedProduct) {
      filteredProducts = products.filter((product) => {
        return product.keywords.includes(searchedProduct);
      })
    }

  filteredProducts.forEach((product) => {
    productsHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML() //Polymorphism = using a method without knowing the class
            }

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;


  function updateCartQuantity() {
    document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
  }

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    let message;

    button.addEventListener('click', () => {
  // dataset return all the data-attributes attached the respected element
    
    const { productId } = button.dataset;

    let added = document.querySelector(`.js-added-to-cart-${productId}`);
    added.classList.add("new-added-to-cart");

    if (message) {
      clearTimeout(message);
    }
    const removeAdded = setTimeout(() => {
      added.classList.remove("new-added-to-cart");
    }, 2000);

    message = removeAdded;


    const quantity = document.querySelector(`.js-quantity-selector-${productId}`);

    const selectedValue = Number(quantity.value);

    addToCart(productId , selectedValue);
    updateCartQuantity();

  /*cart.push({
    productId,
    quantity: selectedValue
  });
  */    
    });
  });
}

