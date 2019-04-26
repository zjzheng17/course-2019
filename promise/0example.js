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
