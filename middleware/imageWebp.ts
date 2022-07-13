const webp = require('webp-converter')

async function imageToWebp(req, res, next) {
	try {
		if (req?.file?.path) {
			webp.cwebp(
				req.file.path,
				req.file.path.split('.')[0] + '.webp',
				'-q 80',
			)
			const imageName = req.file.path.split('\\')

			req.body.image = imageName[imageName.length - 1]
			req.body.imageWebp = req.body.image.split('.')[0] + '.webp'
		}

		next()
	} catch (error) {
		console.log(error)
	}
}

export default imageToWebp
