const jwt = require('jsonwebtoken')
require('dotenv').config()
import Token from '../models/Token'

class TokenService {
	generate(payload) {
		const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
			expiresIn: '1h',
		})

		const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET)

		return {
			accessToken,
			refreshToken,
			expiresIn: 3600,
		}
	}

	async save(id, refreshToken) {
		const token = await Token.findOne({ where: { user: id } })

		if (token) {
			await Token.update({ refreshToken }, { where: { user: id } })
			const data = await Token.findOne({ where: { user: id } })
			return data
		}

		const data = await Token.create({ user: id, refreshToken })
		return data
	}

	validateRefresh(refreshToken) {
		try {
			return jwt.verify(refreshToken, process.env.REFRESH_SECRET)
		} catch (error) {
			return null
		}
	}

	validateAccess(accessToken) {
		try {
			return jwt.verify(accessToken, process.env.ACCESS_SECRET)
		} catch (error) {
			return null
		}
	}

	async findToken(refreshToken) {
		try {
			return await Token.findOne({ where: { refreshToken } })
		} catch (error) {
			return null
		}
	}
}

module.exports = new TokenService()
