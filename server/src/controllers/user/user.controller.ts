import * as express from 'express'
import NotAuthorizedException from '../../helpers/errors/NotAuthorizedException'
import Controller from '../../interfaces/controller.interface'
import RequestWithUser from '../../interfaces/requestWithUser.interface'
import authMiddleware from '../../middleware/auth.middleware'
import questionModel from '../question/question.model'

class UserController implements Controller {
    public path = '/users'
    public router = express.Router()
    private question = questionModel

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id/questions`, authMiddleware, this.getAllQuestionsOfUser)
    }

    private getAllQuestionsOfUser = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
        const userId = request.params.id
        if (userId === request.user._id.toString()) {
            const questions = await this.question.find({ author: userId })
            response.send(questions)
        }
        next(new NotAuthorizedException())
    }
}

export default UserController