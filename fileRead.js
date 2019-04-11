let fs = require('fs');
const path = './doc.md';
let fileContent = '';

fs.readFile(path, 'utf8', function(err, data) {
  fileContent = data;
  // console.log(data);
  console.log('fileContent:', fileContent);
  // do something
});


