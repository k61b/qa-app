import mongoose from 'mongoose'
import endpoint from '../../lib/endpoint.cofig'
import IConnectDatabase from '../../interfaces/IConnectDatabase.interface'

class ConnectDB implements IConnectDatabase {

    constructor() {
        this.connectDatabase()
    }

    public connectDatabase() {
        mongoose.connect(endpoint.MONGO_URI, {
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