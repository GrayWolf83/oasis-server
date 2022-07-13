interface ICategory {
	id: string
	name: string
	email: string
	password: string
	role: 'user' | 'manage'
}

export default ICategory
