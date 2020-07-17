const arrayAdd = require('array-add-num');

let total = arrayAdd([5,4,3,8]);

console.log("Sum of Array is", total)

//Wasn't sure but found a solution on StackOverFlow
console.log(Object.keys(require('./package.json').dependencies));
console.log(Object.values(require('./package.json').dependencies));