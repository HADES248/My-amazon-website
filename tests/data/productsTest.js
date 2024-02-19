import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";

describe('test suite: Products Test' , () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
  });

  it('checks the matching product', () => {
    const product = getProduct(productId3);
    expect(
      product.priceCents
    ).toEqual(799);
    expect(
      product.name
    ).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
  });
  it('checks the non matching product', ()=> {
    const product = getProduct('does not exist');
    expect(
      product
    ).toEqual(undefined);
  });
});