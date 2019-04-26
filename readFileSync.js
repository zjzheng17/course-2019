let fs = require('fs');
const path = './doc.md';
let fileContent = '';

fileContent = fs.readFileSync(path, 'utf8');
console.log('fileContent:', fileContent);
