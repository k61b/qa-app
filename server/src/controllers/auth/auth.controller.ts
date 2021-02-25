import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from 'src/interfaces/IControllerBase.interface'

class AuthController implements IControllerBase {
    public path = '/auth'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(`${this.path}/register`, this.getRegister)
    }

    getRegister = (req: Request, res: Response) => {
        res
            .status(200)
            .json({
                success: true
            })
    }
}

export default AuthController