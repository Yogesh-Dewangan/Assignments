const { myFileWriter, myFileUpdater, myFileReader, myFileDeleter } = require('./index')
const fileName = 'File.txt';
myFileWriter(fileName, 'Hello')
myFileReader(fileName);
myFileUpdater(fileName, ' World');
myFileDeleter(fileName);