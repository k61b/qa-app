import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import * as bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import IControllerBase from 'src/interfaces/IControllerBase.interface'
import IUser from './auth.interface'
import User from '../../model/user.model'
import UserWithThatEmailAlreadyExistsException from '../../helpers/errors/UserWithThatEmailAlreadyExistsException'
import WrongCredentialsException from '../../helpers/errors/WrongCredentialsException'

class AuthController implements IControllerBase {
    public path = '/auth'
    public router = express.Router()
    private user = User

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post(`${this.path}/register`, this.registration)
        this.router.post(`${this.path}/login`, this.loggingIn)
    }

    registration = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        const userData: IUser = req.body

        if (await this.user.findOne({ email: userData.email })) {
            next(new UserWithThatEmailAlreadyExistsException(userData.email))
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, 10)
            const user: any = await this.user.create({
                ...userData,
                password: hashedPassword
            })
            user.password = undefined
            res.send(user)
        }
    })

    loggingIn = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const logInData: IUser = req.body
        const user: any = await this.user.findOne({ email: logInData.email }).select("+password")
        if (user) {
            const isPasswordMatching = await bcrypt.compare(logInData.password, user.password)
            
            if (isPasswordMatching) {
                user.password = undefined
                res.send(user)
            } else {
                next(new WrongCredentialsException())
            }
        } else {
            next(new WrongCredentialsException())
        }
    })

}

export default AuthController