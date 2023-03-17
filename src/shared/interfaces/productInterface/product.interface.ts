import { ICategory } from './category.interface'
import { IClassification } from './classification.interface'
export interface IProduct {
  _id?: string;
  image?: string;
  title: string;
  category: ICategory;
  classification: IClassification;
  count: number;
  price: number;
  gender: string;
  volume: string;
  type_of_aroma: string;
  country_of_TM: string;
  made_in: string;
  description: string;
}
