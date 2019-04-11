let queue = [];
for (let i=0; i< 9999; i++) {
  queue.push({ key: i });
}

setTimeout(() => {
  console.log('hello world');
}, 50);

queue.map((item) => {
  console.log(item);
});


// example 1

// const array = [1, 2, 3];
// const result = _.map(array, syncFunc);
// // ↓ async/await
// const result = await _.map(array, asyncFunc);
// function syncFunc(n) {
//   return n * 2;
// }
// function asyncFunc(n) {
//   return new Promise(resolve => setTimeout(resolve, 10, n * 2));
// }


// example 2


// async function test(){
//   let arr = [1,2,3];
//   arr.forEach(async (num) => {
//    let result = await getData(num);
//    console.log(result);
//   });
//   console.log('after foreach');
// }

// function getData(x){
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(x);
//     }, 500);
//   });
// }

// test().then(() =>{
//   console.log('done');
// })


