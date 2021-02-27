import { NextFunction, Request, Response } from 'express'

const customErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    res
        .status(400)
        .json({
            success: false
        })
}

export default customErrorHandler