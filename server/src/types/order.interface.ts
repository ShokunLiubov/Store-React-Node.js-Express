import { Document, PaginateModel, Schema } from 'mongoose'

export interface IOrderDocument extends Document {
    fullName: string;
    status: string;
    products: { count?: number; productId?: Schema.Types.ObjectId }[];
    createdAt: Date;
    allPrice?: number;
    address?: {
      city?: string;
      street?: string;
      postOffice?: string;
    };
  }

export interface IOrderModel<T extends Document> extends PaginateModel<T> {}