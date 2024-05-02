import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary} from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/car.js';
// import '../data/cart-class.js'
//import '../data/backend-practice.js';

//async makes a function return a promise
async function loadPage() {
  await loadProductsFetch();

  const value = await new Promise((resolve) => {
        loadCart(() => {
          resolve('value3');
        });
      });

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

}
loadPage();


// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve('value2');
//     });
//   })
// ]).then((values) => {
//   console.log(values);
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });


// let us wait for some code to finish before going to the next step
// resolve is a function that lets us control when to go to the next step

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value1');
//   });

// }).then((value) => {
//   console.log(value);
//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   });

// }).then(() => {
// });


// loadProducts(() => {
//   loadCart(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// })
