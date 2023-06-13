import { Request, Response } from 'express'

export interface IAuth {
    username: string;
    password: string;
}

export interface IReqIsAuth extends Request {
    id: string
}

export interface IReqAuthMiddleware extends IReqIsAuth {
    id: string
    headers: {
        authorization: string
    }
    user: any
}

export interface IResIsAuth extends Response {
    id: string
}