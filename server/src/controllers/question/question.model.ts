import * as mongoose from 'mongoose'
import Question from './question.interface'

const questionSchema = new mongoose.Schema({
    author: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    content: String,
    title: String,
})

const questionModel = mongoose.model<Question & mongoose.Document>('Question', questionSchema)

export default questionModel