const fs = require('fs/promises')

const myFileWriter = async (fileName, fileContent) => {
	fs.writeFile(fileName, fileContent);
}

const myFileReader = async (fileName) => {
	fs.readFile(fileName, {encoding: 'utf-8'}, (err) => {
		if (err) {
			console.log(err);
		}
	}).then(data => {
		console.log(data);
	})

}


const myFileUpdater = async (fileName, fileContent) => {
	fs.appendFile(fileName, fileContent, err => {
		if (err) {
			console.log(err)
		}
	})
}

const myFileDeleter = async (fileName) => {
	fs.unlink(fileName, err => {
		if(err) {
			console.log(err)
		}
	})
}



module.exports = { myFileWriter, myFileUpdater, myFileReader, myFileDeleter }