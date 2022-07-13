const express = require('express')
import bcrypt from 'bcryptjs'
import User from '../../models/User'
import IUser from '../../types/user'
const tokenService = require('../../services/token.service')
const router = express.Router()

router.post('/signUp', async (req, res) => {
	try {
		const { email, password, name } = req.body
		console.log(req.body)

		const existingUser = await User.findOne({ where: { email } })
		if (existingUser) {
			return res.status(400).json({
				message: 'Данный email уже зарегистрирован',
				code: 400,
			})
		}

		const hashedPassword = await bcrypt.hash(password, 12)

		await User.create({
			email,
			password: hashedPassword,
			name,
		})

		const newUser: IUser = await User.findOne({ where: { email } })

		const tokens = tokenService.generate({ id: newUser.id })
		await tokenService.save(newUser.id, tokens.refreshToken)
		console.log('tokens', tokens)

		res.status(201).send({
			...tokens,
			user: {
				id: newUser.id,
				name: newUser.name,
				role: newUser.role,
			},
		})
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка!',
			code: 500,
		})
	}
})

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } })

		if (!user) {
			return res
				.status(400)
				.json({ message: 'Ошибка авторизации', code: 400 })
		}

		const isValidPassword = await bcrypt.compare(password, user.password)
		if (!isValidPassword) {
			return res
				.status(400)
				.json({ message: 'Ошибка авторизации', code: 400 })
		}

		const tokens = tokenService.generate({ id: user.id })
		await tokenService.save(user.id, tokens.refreshToken)

		res.status(200).send({
			...tokens,
			user: {
				id: user.id,
				name: user.name,
				role: user.role,
			},
		})
	} catch (error) {
		res.status(500).json({
			message: 'На сервере произошла ошибка!',
			code: 500,
		})
	}
})

function isTokenInvalid(data, dbToken) {
	return !data || !dbToken || data.id.toString() !== dbToken?.user.toString()
}

router.post('/token', async (req, res) => {
	try {
		const { refreshToken } = req.body

		const data = tokenService.validateRefresh(refreshToken)
		const dbToken = await tokenService.findToken(refreshToken)

		if (isTokenInvalid(data, dbToken)) {
			return res.json({ message: 'Вы не авторизованы', code: 401 })
		}

		const tokens = await tokenService.generate({
			id: dbToken.user.toString(),
		})

		await tokenService.save(data.id, tokens.refreshToken)
		const user = await User.findOne({ where: { id: data.id } })

		res.status(200).send({
			...tokens,
			user: {
				id: user.id,
				name: user.name,
				role: user.role,
			},
		})
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка!',
			code: 500,
		})
	}
})

export default router
