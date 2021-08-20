const products = [];

class ProductsRepository {
    
    static defaultPriceIncreasePerDay = -1;
    static defaultAllowToModifyPrice = true;
    static defaultAllowToModifySellIn = true;
    static defaultAlwaysTwicePriceValue = false;

    // upsert a stacked Product
    upsertProduct(name, options = null) {
        const existProduct = products.find(x => x.name === name);
        if (existProduct) {
            existProduct.options = options;
        } else  {
            products.push({ productName: name, options });
        }
    }

    getListProducts() {
        return products;
    }

    static getOptionsByProductName(name) {
        const product = products.find(x => x.productName === name);

        if (!product)
            throw `Product doesn't exist`;

        const productOptions = product?.options;

        return {
            priceIncreasePerDay: ProductsRepository.isNullOption(productOptions?.priceIncreasePerDay) ? 
                ProductsRepository.defaultPriceIncreasePerDay : productOptions?.priceIncreasePerDay,
            allowToModifyPrice: ProductsRepository.isNullOption(productOptions?.allowToModifyPrice) ? 
                ProductsRepository.defaultAllowToModifyPrice : productOptions?.allowToModifyPrice,
            allowToModifySellIn: ProductsRepository.isNullOption(productOptions?.allowToModifySellIn) ? 
                ProductsRepository.defaultAllowToModifySellIn : productOptions?.allowToModifySellIn,
            alwaysTwicePriceValue: ProductsRepository.isNullOption(productOptions?.alwaysTwicePriceValue) ? 
                ProductsRepository.defaultAlwaysTwicePriceValue : productOptions?.alwaysTwicePriceValue
        };
    }

    static isNullOption(option) {
        return option === null || option === undefined;
    }
}

module.exports = ProductsRepository;