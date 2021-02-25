import * as bodyParser from 'body-parser'

import App from './app'
import loggerMiddleware from './middleware/logger'
import endpoint from './lib/endpoint.cofig'
import ConnectDB from './helpers/database/db'

import HomeController from './controllers/home/home.controller'
import QuestionController from './controllers/question/question.controller'
import AuthController from './controllers/auth/auth.controller'

// Connect DataBase
const connect = new ConnectDB()
connect

const app = new App({
    port: endpoint.PORT,
    controllers: [
        new HomeController(),
        new QuestionController(),
        new AuthController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()