let fs = require('fs');
let path = require('path');
const basePath = './';
fs.readdir(basePath, {encoding: 'utf8', withFileTypes: true}, (err, dirs) => {
  console.log(dirs);
});
