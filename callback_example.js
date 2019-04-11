const step0 = 'step 0 - start';
const step1 = 'step 1 - run';
const step2 = 'step 2 - run';
const stepDone = 'step Done';

const start = (callback) => {
  setTimeout(() => {
    console.log(step0);
    callback();
    stepEvent2(stepEventDone);
  }, 500);
}
const stepEvent1 = () => {
  console.log(step1);
};
const stepEvent2 = (callback) => {
  setTimeout(() => {
    console.log(step2);
    callback();
  }, 500)
};
const stepEventDone = () => {
  console.log(stepDone);
};

start(stepEvent1);




// const step0 = 'step 0 - start';
// const step1 = 'step 1 - run';
// const step2 = 'step 2 - run';
// const stepDone = 'step Done';


// const start = () => {
//   setTimeout(() => {
//     console.log(step0);
//   },500)
// };
// const stepEvent1 = () => {
//   console.log(step1);
// };
// const stepEvent2 = () => {
//   setTimeout(() => {
//     console.log(step2);
//   }, 500)
// };
// const stepEventDone = () => {
//   console.log(stepDone);
// };

// start();