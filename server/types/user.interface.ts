import { Schema } from 'mongoose'
import { EnumRoles } from '../enums/roles.enum'

export interface IUserDocument {
    username: string
    password: string
    roles: EnumRoles[]
    userInfo?: {
        fullName: string
        email: string
        phone: number
        address: {
            city: string
            street: string
            postOffice: string
        }
    }
    orders: Schema.Types.ObjectId[]
}