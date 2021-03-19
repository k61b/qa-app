import * as express from 'express'
import { Request, Response } from 'express'
import Controller from '../../interfaces/controller.interface'

class QuestionController implements Controller {
    public path = '/questions'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path, this.getAllQuestions)
    }

    getAllQuestions = (req: Request, res: Response) => {
        res
            .status(200)
            .json({
                success: true
            })
    }
}

export default QuestionController