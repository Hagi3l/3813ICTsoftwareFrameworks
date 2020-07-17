

let obj = { 
    "people": [
        {
            "firstName": "Tom",
            "lastName": "Doe"
        },
        {
            "firstName": "Jane",
            "lastName": "Does"
        },
        {
            "firstName": "Rob",
            "lastName": "Toe"
        },
    ]
}

console.log(obj);
let strify = JSON.stringify(obj);
console.log(strify);
let strparse = JSON.parse(strify);
console.log(strparse);