import express from 'express'
import { Application } from 'express'

class App {
    public app: Application
    public port: number
    public useHelper: any

    constructor(appInit: { port: any; middleWares: any; controllers: any; helperS: any; }) {
        this.app = express()
        this.port = appInit.port

        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)
        this.helpers(appInit.helperS)
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/api', controller.router)
        })
    }

    private helpers(helperS: { forEach: (arg0: (helperS: any) => void) => void; }) {
        helperS.forEach(helper => {
          this.useHelper = new helper
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App