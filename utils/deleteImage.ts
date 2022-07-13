const fs = require('fs')
var appRoot = require('app-root-path')

function deleteImage(name) {
	console.log('path', appRoot + '/src/uploads/' + name)

	fs.unlink(appRoot + '/uploads/' + name, function (err) {
		err ? false : true
	})
}

export default deleteImage
