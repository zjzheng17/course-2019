let http = require('http');
let https = require('https');
let imgPath = '';

http.createServer((req, res) => {
  https.get('https://dog.ceo/api/breeds/image/random', (body) => {
    let data = '';

    body.on('data', (chunk) => {
      data += chunk;
    });

    body.on('end', () => {
      console.log(JSON.parse(data));
    });
  }).on('error', (error) => {
    console.error(error);
  });

  res.end(`<h1>DOG PAGE</h1><img src='${imgPath}' >`);

}).listen(3000);

console.log('Server start: http://127.0.0.1:3000');


// 上述程式要如何改寫成將 dog img 可以正確透過 imgPath 將照片顯示於網頁中
