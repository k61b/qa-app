import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import IControllerBase from 'src/interfaces/IControllerBase.interface'
import IUser from './auth.interface'
import User from '../../model/user.model'
import HttpException from '../../helpers/errors/HttpException'

class AuthController implements IControllerBase {
    public path = '/auth'
    public router = express.Router()

    private users: IUser[] = []

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post(`${this.path}/register`, this.createUser)
        this.router.get(`${this.path}/error`, this.errorTest)
    }

    createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        const user: IUser = req.body
        this.users.push(user)

        const newUser: IUser[] = await User.create(this.users)

        res
            .status(201)
            .json({
                success: true,
                data: newUser
            })
    })

    errorTest = (req: Request, res: Response, next: NextFunction) => {
        next(new HttpException(404, 'Error Test'))
    }
}

export default AuthController