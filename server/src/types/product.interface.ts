import { Request } from 'express'

import { Document, PaginateModel, Schema } from 'mongoose'

export interface IProductsDocument extends Document {
    id: string
    image: string;
    title: string;
    category:  Schema.Types.ObjectId;
    classification: Schema.Types.ObjectId;
    price: number;
    count: number;
    gender: string
    volume: string
    type_of_aroma: string
    country_of_TM: string
    made_in: string
    description: string
    createdAt: Date
  }

export interface IProductsModel<T extends Document> extends PaginateModel<T> {}

export interface IAuth {
    username: string;
    password: string;
}



export interface IReqWithImg extends Request {
    file?: any;
}