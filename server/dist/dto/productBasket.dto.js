export default class ProductBasketDto {
    constructor(model) {
        this.count = 1;
        this.id = model.id;
        this.image = model.image;
        this.title = model.title;
        this.category = model.category;
        this.classification = model.classification;
        this.price = model.price;
        this.available = model.count;
    }
}
