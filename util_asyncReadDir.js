const {promisify} = require('util');
let fs = require('fs');
let path = require('path');
const basePath = './';

let readdir = promisify(fs.readdir);
let stat = promisify(fs.stat);

const isDir = async (subPath) => {
  let pathResult = await stat(subPath);
  if (pathResult.isDirectory()) {
    return subPath;
  } else {
    throw('data is not a directory');
  }
};

let dirs = async () => {
  return await readdir(basePath, {encoding: 'utf8', withFileTypes: true})
};

async function start () {
  try {
    let folders = await dirs();
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