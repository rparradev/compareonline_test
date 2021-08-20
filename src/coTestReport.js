const Product = require('./refactor/product');
const CarInsurance = require('./refactor/carInsurance');
const ProductRepository = require('./refactor/productsRepository');

const productsAtDayZero = [
    new Product('Medium Coverage', 10, 20),
    new Product('Full Coverage', 2, 0),
    new Product('Low Coverage', 5, 7),
    new Product('Mega Coverage', 0, 80),
    new Product('Mega Coverage', -1, 80),
    new Product('Special Full Coverage', 15, 20),
    new Product('Special Full Coverage', 10, 49),
    new Product('Special Full Coverage', 5, 49),
    new Product('Super Sale', 3, 6),
  ];

  const initSpecialProducts = function() {

    const defaultPriceIncreasePerDay = 1;

    const productRepository = new ProductRepository();
    productRepository.upsertProduct('Low Coverage');
    productRepository.upsertProduct('Medium Coverage');
    productRepository.upsertProduct('Full Coverage', { priceIncreasePerDay: defaultPriceIncreasePerDay });
    productRepository.upsertProduct('Mega Coverage', { allowToModifySellIn: false, allowToModifyPrice: false });
    productRepository.upsertProduct('Special Full Coverage', { priceIncreasePerDay: defaultPriceIncreasePerDay });
    
    // new product
    productRepository.upsertProduct('Super Sale', { alwaysTwicePriceValue: true });
  }
  
  initSpecialProducts();
  const carInsurance = new CarInsurance(productsAtDayZero);
  const productPrinter = function (product) {
    console.log(`${product.name}, ${product.sellIn}, ${product.price}`);
  };
  
  for (let i = 1; i <= 30; i += 1) {
    console.log(`---Day ${i}---`);
    console.log('name, sellIn, price');
    carInsurance.updatePrice().forEach(productPrinter);
    console.log('');
  }