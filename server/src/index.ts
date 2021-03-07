import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import App from './app'
import loggerMiddleware from './middleware/logger.middleware'
import customErrorHandler from './middleware/error.middleware'
import endpoint from './lib/endpoint.cofig'
import ConnectDB from './helpers/database/db'

import HomeController from './controllers/home/home.controller'
import QuestionController from './controllers/question/question.controller'
import AuthController from './controllers/user/user.controller'
// import authMiddleware from './middleware/auth.middleware'

const app = new App({
    port: endpoint.PORT,
    controllers: [
        new HomeController(),
        new QuestionController(),
        new AuthController()
    ],
    helperS: [
        ConnectDB
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        cookieParser(),
        // authMiddleware,
        loggerMiddleware,
        customErrorHandler
    ]
})

app.listen()