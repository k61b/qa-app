import { resolve } from 'path'
import { config } from 'dotenv'

config({ path: resolve(__dirname, '../../.env') })

export default {
    NODE_ENV: process.env.NODE_ENV ?? '',
    PORT: process.env.PORT ?? '',
    MONGO_URI: process.env.MONGO_URI ?? ''
}