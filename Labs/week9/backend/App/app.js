const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const add = require('./add');
const read = require('./read');
const remove = require('./remove');
const update = require('./update');

const docArray = [
  {
      "id": "1",
      "name": "iPhone 6",
      "description": "Best phone in the world!",
      "price": 999,
      "units": 99
  },
  {
      "id": "2",
      "name": "iPhone X",
      "description": "Not a bad phone",
      "price": 1499,
      "units": 25
  },
  {
      "id": "3",
      "name": "Samsung Galaxy S10",
      "description": "Number 1 phone on the planet",
      "price": 850,
      "units": 75
  }
];


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydb';

// Use connect method to connect to the server
const client = MongoClient.connect(url, function(err, client) {
  assert.strictEqual(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  const collection = db.collection('products');

  add(collection, docArray);

  client.close();
});
