import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import IControllerBase from '../../interfaces/IControllerBase.interface'
import IUser from './user.interface'
import userModel from './user.model'
import UserWithThatEmailAlreadyExistsException from '../../helpers/errors/UserWithThatEmailAlreadyExistsException'
import WrongCredentialsException from '../../helpers/errors/WrongCredentialsException'
import endpoint from '../../lib/endpoint.config'
import ITokenData from '../../interfaces/ITokenData.interface'
import IDataStoredInToken from '../../interfaces/IDataStoredInToken.interface'
import authMiddleware from '../../middleware/auth.middleware'

class AuthController implements IControllerBase {
    public path = '/auth'
    public router = express.Router()
    private user = userModel

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post(`${this.path}/register`, this.registration)
        this.router.post(`${this.path}/login`, this.loggingIn)
        this.router.post(`${this.path}/logout`, this.loggingOut)
        this.router.get(`${this.path}/profile`, authMiddleware, this.getUser)
        this.router.get(`${this.path}/errortest`, authMiddleware, this.errorTest)
    }

    errorTest = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        res.send(req.body)
    })

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
            const tokenData = this.createToken(user)
            res.setHeader('Set-Cookie', [this.createCookie(tokenData)])
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
                const tokenData = this.createToken(user)
                res.setHeader('Set-Cookie', [this.createCookie(tokenData)])
                res.send(user)
            } else {
                next(new WrongCredentialsException())
            }
        } else {
            next(new WrongCredentialsException())
        }
    })

    loggingOut = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        res.send(200);
    })

    getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const cookies = req.cookies
        const dataResponse = jwt.verify(cookies.Authorization, endpoint.JWT_SECRET) as IDataStoredInToken
        const id = dataResponse._id
        const user = await this.user.findById(id)
        res.send(user)
        
    })

    createToken(user: IUser): ITokenData {
        const expiresIn = 60 * 60
        const secret = endpoint.JWT_SECRET
        const dataStoredInToken: IDataStoredInToken = {
            _id: user._id
        }
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn })
        }
    }

    createCookie(tokenData: ITokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`
    }

}

export default AuthController