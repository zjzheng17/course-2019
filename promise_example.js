var error = true;
var person = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (error) {
      return reject('error happend');
    }
    resolve({
      name: 'SOME',
      age: 30,
      level: 999,
    });
  }, 100);
});

person
.then((man) => {
  console.log('Welcome to 2019', man);
  return man.name + ' say: hi, '+ 2019;
})
.then((data) => {
  console.log(data);
  return person;
})
.catch((error) => {
  console.warn(error);
});





// var person1 = Promise.resolve('I am ONE');
// var person2 =  new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('I am TWO');
//   }, 300);
// }); ;
// var person3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('I am THREE');
//   }, 100);
// });

// Promise.all([
//   person1,
//   person2,
//   person3
// ])
// .then(values => {
//   console.log(values); 
//   // [ 'I am ONE', 'I am TWO', 'I am THREE' ]
// });