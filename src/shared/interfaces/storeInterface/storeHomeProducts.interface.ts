import { IProduct } from './../productInterface/product.interface'
export interface IStoreHomeProducts {
    name: string;
    products: IProduct[];
    slug: string;
}