var fs = require('fs');

var args = process.argv.splice(2);
var fileDirectory = './';
if (fs.existsSync(fileDirectory)) {
  var files = fs.readdirSync(fileDirectory);

  files.forEach(function (file) {
    var filePath = fileDirectory + '/' + file;

    if (/\.gif$/.test(file)) {
      //  var fileName = file.replace(/(\-)(\d+)(\_s\.png)/, function() {
      //      return arguments[1] + ((arguments[2] | 0)) + arguments[3];
      //  });
      var fileName = file.replace('.gif', '.png');
      console.log(fileName);
      var newFilePath = fileDirectory + '/' + fileName;

      fs.rename(filePath, newFilePath, function (err) {
        if (err) throw err;

        console.log(fileName + ' ok~');
      });
    }
  });
} else {
  console.log(fileDirectory + '  Not Found!');
}
