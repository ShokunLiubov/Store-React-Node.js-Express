import { Request } from 'express'

export interface IAuth {
    username: string;
    password: string;
}

export interface IReqIsAuth extends Request {
    id: string
}