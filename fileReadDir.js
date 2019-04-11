let fs = require('fs');
let path = require('path');
const basePath = './';
fs.readdir(basePath, {encoding: 'utf8', withFileTypes: true}, (err, dirs) => {
  dirs.map((dir) => {
    let subPath = path.join(basePath, dir);
    fs.stat(subPath, (error, pathResult) => {

      if (pathResult.isDirectory()) {
        fs.readdir(subPath, (error, fileName) => {
          console.log('file in dir,', fileName);
        })
      }
    });
  });
  console.log(dirs);
});
