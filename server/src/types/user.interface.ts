import { Schema } from 'mongoose'
import { EnumRoles } from '../enums/roles.enum'
import { IPagination } from './pagination.interface'

export interface IUserDocument {
    id: string
    username: string
    password: string
    roles: EnumRoles[]
    userInfo?: IUserInfoDocument
    orders: Schema.Types.ObjectId[]
}

export interface IUserInfoDocument {
    id: string
    fullName: string
    email: string
    phone: number
    address: {
        city: string
        street: string
        postOffice: string
    }
}

export interface IUserQueryFilters extends IPagination {
    search?: RegExp
    city?: string
}

export interface IRole {
    _id: string;
    value: string;
}
