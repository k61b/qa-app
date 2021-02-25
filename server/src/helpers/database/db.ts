import mongoose from 'mongoose'
import endpoint from '../../lib/endpoint.cofig'
import IConnectDatabase from './IConnectDatabase.interface'

class ConnectDB implements IConnectDatabase {

    public uri = endpoint.MONGO_URI

    constructor() {
        this.connectDatabase()
    }

    public connectDatabase() {
        mongoose.connect(this.uri, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
            .then(() => {
                console.log("MongoDb Connection Successful")
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export default ConnectDB