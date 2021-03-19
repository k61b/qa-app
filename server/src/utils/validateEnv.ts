import { cleanEnv, port, str } from 'envalid'
import endpoint from '../lib/endpoint.config'

function validateEnv() {
    cleanEnv(endpoint, {
        MONGO_URI: str(),
        PORT: port()
    })
}

export default validateEnv