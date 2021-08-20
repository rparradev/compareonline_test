const expect = require('chai').expect;

const Product = require('./../src/refactor/product');
const CarInsurance = require('./../src/refactor/carInsurance');
const ProductRepository = require('./../src/refactor/productsRepository');

describe("Co Test", function() {

  before(function() {
    const defaultPriceIncreasePerDay = 1;

    const productRepository = new ProductRepository();
    productRepository.upsertProduct('Low Coverage');
    productRepository.upsertProduct('Medium Coverage');
    productRepository.upsertProduct('Full Coverage', { priceIncreasePerDay: defaultPriceIncreasePerDay });
    productRepository.upsertProduct('Mega Coverage', { allowToModifySellIn: false, allowToModifyPrice: false });
    productRepository.upsertProduct('Special Full Coverage', { priceIncreasePerDay: defaultPriceIncreasePerDay });
    
    // new product
    productRepository.upsertProduct('Super Sale', { alwaysTwicePriceValue: true });
    
  });
 

  it("should The price of a product is never more than 50", function() {
    const carInsurance = new CarInsurance([ new Product("Low Coverage", 5, 51) ]);
    const products = carInsurance.updatePrice();
    expect(products[0].price).equal(50);
  });

  it("should The price of a product is never negative", function() {
    const carInsurance = new CarInsurance([ new Product("Low Coverage", 5, 0) ]);
    const products = carInsurance.updatePrice();
    expect(products[0].price).equal(0);
  });

  it("should Low Coverage price decrease by one", function() {
    const carInsurance = new CarInsurance([ new Product("Low Coverage", 5, 2) ]);
    const products = carInsurance.updatePrice();
    expect(products[0].price).equal(1);
  });

  it("should Medium Coverage price decrease by one", function() {
    const carInsurance = new CarInsurance([ new Product("Medium Coverage", 5, 2) ]);
    const products = carInsurance.updatePrice();
    expect(products[0].price).equal(1);
  });

  it("should Full Coverage price increase by one", function() {
    const carInsurance = new CarInsurance([ new Product("Full Coverage", 5, 2) ]);
    const products = carInsurance.updatePrice();
    expect(products[0].price).equal(3);
  });

  it("should Mega Coverage price doesn't change", function() {
    const carInsurance = new CarInsurance([ new Product("Mega Coverage", 5, 2) ]);
    const products = carInsurance.updatePrice();
    expect(products[0].price).equal(2);
  });

  it("should Mega Coverage sellIn doesn't change", function() {
    const carInsurance = new CarInsurance([ new Product("Mega Coverage", 5, 2) ]);
    const products = carInsurance.updatePrice();
    expect(products[0].sellIn).equal(5);
  });

  it("should Special Full Coverage price increase by 3", function() {
    const carInsurance = new CarInsurance([ new Product("Special Full Coverage", 5, 2) ]);
    const products = carInsurance.updatePrice();
    expect(products[0].price).equal(5);
  });

  it("should Special Full Coverage price increase by 2", function() {
    const carInsurance = new CarInsurance([ new Product("Special Full Coverage", 10, 2) ]);
    const products = carInsurance.updatePrice();
    expect(products[0].price).equal(4);
  });

  it("should Super Sale degrade in price twice as fast as normal Products", function() {
    const carInsurance = new CarInsurance([ new Product("Super Sale", 3, 6) ]);
    const products = carInsurance.updatePrice();
    expect(products[0].price).equal(4);
  });

});
