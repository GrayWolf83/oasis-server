const tokenService = require('../services/token.service')
import User from '../models/User'

export default async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		next()
	}

	try {
		const token = req.headers.authorization.split(' ')[1]

		if (!token) {
			return res
				.status(401)
				.json({ message: 'Вы не авторизованы', code: 401 })
		}

		const data = tokenService.validateAccess(token)

		if (!data) {
			return res
				.status(401)
				.json({ message: 'Вы не авторизованы', code: 401 })
		}

		const user = await User.findOne({ where: { id: data.id } })

		req.body.user = {
			id: user.id,
			role: user.role,
		}
		next()
	} catch (error) {
		res.status(401).json({ message: 'Вы не авторизованы', code: 401 })
	}
}
