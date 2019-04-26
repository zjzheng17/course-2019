let fs = require('fs');
let path = require('path');
const basePath = './';

let dirs = new Promise((resolve, reject) => {
  fs.readdir(basePath, {encoding: 'utf8', withFileTypes: true}, (err, dirs) => {
    return resolve(dirs);
  });
});

const isDir = (subPath) => {
  return new Promise((resolve, reject) => {
    fs.stat(subPath, (error, pathResult) => {
      if (pathResult.isDirectory()) {
        return resolve(subPath);
      }
      return reject(`[ERROR]: ${subPath}`);
    });
  });
};

dirs
.then((folders) => {
  let fullPaths = [];
  folders.map((dir) => {
    let subPath = path.join(basePath, dir.name || dir);
    fullPaths.push(subPath);
  });
  return fullPaths;
})
.then((folders) => {

  folders.map((dir) => {

    isDir(dir)
    .then((subPath) => {
      fs.readdir(subPath, (error, fileName) => {
        console.log('SUCCESS in dir,', fileName);
      })
    })
    .catch((error) => {
      console.warn('ERROR:', error);
    });

  });
});

