import { IProductBasket } from './productBasket.interface';
export interface IOrder {
  _id?: number;
  fullName: string;
  allPrice: number;
  status?: string;
  products: [IProductBasket]
  address: {
    city: string;
    street: string;
    postOffice: string;
  };
  createdAt?: string
}

