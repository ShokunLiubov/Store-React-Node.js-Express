import { ICategory } from './category.interface'
import { IClassification } from './classification.interface'

export interface IProductBasket {
  id: string;
  image: string;
  title: string;
  category: ICategory;
  classification: IClassification;
  available: number;
  count: number;
  price: number;
}
