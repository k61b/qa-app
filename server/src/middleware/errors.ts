import { NextFunction, Request, Response } from 'express'
import HttpExpception from '../helpers/errors/HttpException'

const customErrorHandler = (err: HttpExpception, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500
    const message = err.message || 'Something went wrong'
    res
    .status(status)
    .send({
        status,
        message
    })
}

export default customErrorHandler