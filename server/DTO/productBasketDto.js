export default class ProductBasketDto {
  id;
  image;
  title;
  category;
  classification;
  price;
  available;
  count = 1;
  constructor(model) {
    this.id = model._id;
    this.image = model.image;
    this.title = model.title;
    this.category = model.category;
    this.classification = model.classification;
    this.price = model.price;
    this.available = model.count;
  }
}
