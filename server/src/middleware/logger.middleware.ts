import { NextFunction, Request, Response } from 'express'

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {

    console.log('Request logged:', req.method, req.path)
    next()
}

export default loggerMiddleware