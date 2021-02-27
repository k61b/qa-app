import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from 'src/interfaces/IControllerBase.interface'
import IUser from './auth.interface'
import User from '../../model/user.model'

class AuthController implements IControllerBase {
    public path = '/auth'
    public router = express.Router()

    private users: IUser[] = []

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post(`${this.path}/register`, this.createUser)
    }

    createUser = async (req: Request, res: Response) => {
        const user: IUser = req.body
        this.users.push(user)
        
        const newUser:IUser[] = await User.create(this.users)

        res
        .status(201)
        .json({
            success: true,
            data: newUser
        });

    }
}

export default AuthController