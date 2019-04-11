const step0 = 'step 0 - start';
const step1 = 'step 1 - run';
const step2 = 'step 2 - run';
const stepDone = 'step Done';


const start = (callback) => {
  setTimeout(() => {
    console.log(step0);
    // @TODO:
    callback();
  },500);
}

const stepEvent1 = () => {
  return (callback) => {
    // @TODO:
    console.log(step1);
  };
};

const stepEvent2 = () => {
  return () => {

    setTimeout(() => {
      // @TODO
      console.log(step2);
    }, 500)
  };
};

const stepEventDone = () => {
  return console.log(stepDone);
};

start(stepEvent1);


// const step0 = 'step 0 - start';
// const step1 = 'step 1 - run';
// const step2 = 'step 2 - run';
// const stepDone = 'step Done';


// const start = (callback) => {
//   setTimeout(() => {
//     console.log(step0);
//     let event = callback();
//     event(stepEvent2);
//   },500);
// }

// const stepEvent1 = () => {
//   return (callback) => {
//     console.log(step1);
//     let event = callback(stepEventDone);
//     event();
//     // stepEventDone();
//   };
// };

// const stepEvent2 = (callback) => {
//   return () => {
//     setTimeout(() => {
//       console.log(step2);
//       callback();
//     }, 500)
//   };
// };

// const stepEventDone = () => {
//   return console.log(stepDone);
// };

// start(stepEvent1);