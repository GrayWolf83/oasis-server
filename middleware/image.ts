const multer = require('multer')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		const ext = file.originalname.split('.')

		cb(null, Date.now() + '.' + ext[ext.length - 1])
	},
})

const fileFilter = (req, res, cb) => {
	if (true) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

const imageMiddleware = multer({
	storage,
	fileFilter,
})

export default imageMiddleware
