class CarInsurance {
    constructor(products = []) {
        this.products = products;
    }

    updatePrice() {
        this.products.forEach(product => product.processUpdate());
        return this.products;
    }
}

module.exports = CarInsurance;