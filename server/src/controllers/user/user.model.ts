import mongoose from 'mongoose'
import User from './user.interface'

export const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: {
            type: String,
            get: (): undefined => undefined
        },
        profile_image: {
            type: String,
            default: "default.jpg"
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})

userSchema.virtual('questions', {
    ref: 'Question',
    localField: '_id',
    foreignField: 'author'
})

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema)

export default userModel