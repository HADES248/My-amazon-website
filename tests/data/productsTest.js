import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { Clothing, Product , Appliance } from "../../data/products.js";
import { loadProductsFetch } from "../../data/products.js";

describe('test suite: Products Test' , () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

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

describe('test suite: Product Class', () => {
  let product;
  beforeEach(() => {
    product = new Product ({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    });
  });

  it('checks Product Class', () => {
    expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(product.rating.count).toEqual(87);
  });

  it('checks the stars', () => {
    expect(product.getStarsUrl()).toEqual(`images/ratings/rating-45.png`)
  });

  it('checks the price', () => {
    expect(product.getPrice()).toEqual('$10.90');
  });

  it('checks the extraHTML', () => {
    expect(product.extraInfoHTML()).toEqual('');
  });
});

describe('test suite: Clothing Class', () => {
  let clothing;
  beforeEach(() => {
    clothing = new Clothing ({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });
  });

  it('checks Clothing Class', () => {
    expect(clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(clothing.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
    expect(clothing.rating.count).toEqual(56);
    expect(clothing.sizeChartLink).toEqual('images/clothing-size-chart.png');
  });

  it('checks the stars', () => {
    expect(clothing.getStarsUrl()).toEqual(`images/ratings/rating-45.png`)
  });

  it('checks the price', () => {
    expect(clothing.getPrice()).toEqual('$7.99');
  });

  it('checks the extraHTML', () => {
    expect(clothing.extraInfoHTML()).toContain(`<a href="${clothing.sizeChartLink}" target="_blank">Size Chart</a>`);
  });
});

describe('test suite: Appliance Class', () => {
  let applicance;
  beforeEach(() => {
    applicance = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: "appliance",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png"
    });
  });

  it('checks the Appliance Class', () => {
    expect(applicance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(applicance.image).toEqual('images/products/black-2-slot-toaster.jpg');
    expect(applicance.name).toEqual('2 Slot Toaster - Black');
  });

  it('checks the stars', () => {
    expect(applicance.getStarsUrl()).toEqual(`images/ratings/rating-50.png`)
  });

  it('checks the price', () => {
    expect(applicance.getPrice()).toEqual('$18.99');
  });

  it('checks the instructions', () => {
    expect(applicance.instructionsLink).toEqual('images/appliance-instructions.png');
  });

  it('checks the warranty', () => {
    expect(applicance.warrantyLink).toEqual('images/appliance-warranty.png');
  });

  it('checks the extraHTML', () => {
    expect(applicance.extraInfoHTML()).toContain(`
    <a href="${applicance.instructionsLink}" target="_blank">
      Instructions
    </a>
    <a href="${applicance.warrantyLink}" target="_blank">
      Warranty
    </a>
    `);
  });

});
