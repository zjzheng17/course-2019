let fs = require('fs');
let path = require('path');
const basePath = './';

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

let dirs = new Promise((resolve, reject) => {
  fs.readdir(basePath, {encoding: 'utf8', withFileTypes: true}, (err, dirs) => {
    return resolve(dirs);
  });
});

async function start () {
  try {
    let folders = await dirs;
    let fullPaths = [];
    
    folders.map(async (dir) => {
      let subPath = path.join(basePath, dir);
      fullPaths.push(subPath);
    });

    folders.map(async (dir) => {
      
      try {
        let subPath = await isDir(dir);
        fs.readdir(subPath, (error, fileName) => {
          console.log('SUCCESS in dir,', fileName);
        });
      } catch (e) {
        console.warn(e);    
      }
    });

  } catch (e) {
    console.warn(e);
  }
}

start();


// dirs.then((folders) => {
//   let fullPaths = [];
//   folders.map((dir) => {
//     let subPath = path.join(basePath, dir);
//     fullPaths.push(subPath);
//   });
//   return fullPaths;
// })
// .then((folders) => {

//   folders.map((dir) => {

//     isDir(dir)
//     .then((subPath) => {
//       fs.readdir(subPath, (error, fileName) => {
//         console.log('SUCCESS in dir,', fileName);
//       })
//     })
//     .catch((error) => {
//       console.warn('ERROR:', error);
//     })

//   });
// });
