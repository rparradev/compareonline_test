const ProductRepository = require('./productsRepository');

class Product {
    maxPriceAmount = 50;
    minPriceAmount = 0;

    constructor(name, sellIn, price) {
        this.name = name;
        this.sellIn = sellIn;
        this.price = price;
    }

    processUpdate() {
        const options = ProductRepository.getOptionsByProductName(this.name);

        this.updatePriceByDay(options);

        // modify if is the end of day
        this.modifySellIn(options);
    }

    updatePriceByDay(options) {
        if (options.allowToModifyPrice) {
            
            let priceValue = -1;

            if (this.name === 'Special Full Coverage') {

                if (this.sellIn <= 0) {
                    priceValue = 0;
                } else if (this.sellIn <= 5) {
                    priceValue = this.price + (options.priceIncreasePerDay * 3);
                } else if (this.sellIn <= 10) {
                    priceValue = this.price + (options.priceIncreasePerDay * 2);
                }

            } else {

                if (this.sellIn <= 0 || options.alwaysTwicePriceValue) {
                    options.priceIncreasePerDay *= 2;
                }
            }

            // set price
            if (priceValue >= 0) {
                this.setPrice(priceValue);
            } else {
                this.setPrice(this.price + options.priceIncreasePerDay);
            }
        }
    }

    modifySellIn(options) {
        if (options.allowToModifySellIn) {
            this.sellIn -= 1;
        }
    }

    setPrice(price) {
        this.price = price > this.maxPriceAmount ? this.maxPriceAmount : price < this.minPriceAmount ? this.minPriceAmount : price;
    }
}

module.exports = Product;