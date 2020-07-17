
let arr = [0, 1, 2, 3, 4];

function output(array) {
    for (i of array) {
        console.log(i);
    };
    console.log('--------');
};

console.log("Created an indexed array of 5 numbers");
output(arr);
console.log("Added 5 to the end of the array");
arr.push(5);
output(arr);
console.log("Added 6 to the beginning of the array");
arr.unshift(6);
output(arr);
console.log("Added 7 to the 3rd item of the array");
arr.splice(3, 0, 7);
output(arr);
console.log("Removed the last number of the array");
arr.pop();
output(arr);
console.log("Removed the 2nd number of the array");
arr.splice(1,1);
output(arr);
console.log("Edited the 5th element to value of 100");
arr[4] = 100;
output(arr);
console.log("Sorted the array");
arr.sort(function(a, b){return a-b});
output(arr);
console.log('Done!\n');
