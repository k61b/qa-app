interface User {
    _id: string
	name: string
	email: string
	role: string
	password: string
	createdAt: Date
	title: string
	about: string
	place: string
	website: string
	profile_image: string
	blocked: boolean
}

export default User