let http = require('http');
let https = require('https');
let imgPath = '';

let requestData = () => {
  return new Promise((resolve, reject) => {
    https.get('https://dog.ceo/api/breeds/image/random', (body) => {
      let data = '';

      body.on('data', (chunk) => {
        data += chunk;
      });

      body.on('end', () => {
        console.log(JSON.parse(data));
        // @ADD
        return resolve(JSON.parse(data));
      });
    })
    .on('error', (e) => {
      console.warn(e);
      // @ADD
      return reject(e);
    });
  })
};

http.createServer(async (req, res) => {

  try {
    let data = await requestData();
    imgPath = data.message;
    res.end(`<h1>DOG PAGE</h1><img src='${imgPath}' >`);
  } catch (e) {
    console.warn(e);
  }

}).listen(3000);

console.log('Server start: http://127.0.0.1:3000');

// 上述程式將 promise 進行正確資料回傳，將 resolve / reject 正確填入
// 上述程式要如何透過 `requestData()` 後面用 `.then()` 之前的模式，
// 將 dog img 可以正確透過 imgPath 將照片顯示於網頁中
