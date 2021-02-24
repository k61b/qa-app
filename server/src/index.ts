import * as bodyParser from 'body-parser'

import App from './app'
import loggerMiddleware from './middleware/logger'
import endpoint from './lib/endpoint.cofig'

// import PostsController from './controllers/posts/posts.controller'
import HomeController from './controllers/home/home.controller'

const app = new App({
    port: endpoint.PORT,
    controllers: [
        new HomeController()
        // new PostsController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()