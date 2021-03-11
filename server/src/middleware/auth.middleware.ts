import { NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import AuthenticationTokenMissingException from '../helpers/errors/AuthenticationTokenMissingException'
import WrongAuthenticationTokenException from '../helpers/errors/WrongAuthenticationTokenException'
import IDataStoredInToken from '../interfaces/IDataStoredInToken.interface'
import IRequestWithUser from '../interfaces/IRequestWithUser.interface'
import userModel from '../controllers/user/user.model'
import endpoint from '../lib/endpoint.config'

const authMiddleware = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
    const cookies = req.cookies
    if (cookies && cookies.Authorization) {
        const secret = endpoint.JWT_SECRET
        try {
            const verificationResponse = jwt.verify(cookies.Authorization, secret) as IDataStoredInToken
            const id = verificationResponse._id
            const user = await userModel.findById(id)
            if (user) {
                req.user = user
                next()
            } else {
                next(new WrongAuthenticationTokenException())
            }
        } catch (err) {
            next(new WrongAuthenticationTokenException())
        }
    } else {
        next(new AuthenticationTokenMissingException())
    }
}

export default authMiddleware