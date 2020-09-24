const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// const add = require('./add');
// const read = require('./read');
// const remove = require('./remove');
// const update = require('./update');

const docArray = [
  {
      id: 1,
      name: "iPhone 6",
      desc: "Best phone in the world!",
      price: 999,
      units: 99
  },
  {
      id: 2,
      name: "iPhone X",
      desc: "Not a bad phone",
      price: 1499,
      units: 25
  },
  {
      id: 3,
      name: "Samsung Galaxy S10",
      desc: "Number 1 phone on the planet",
      price: 850,
      units: 75
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

  //Seeding the database
  db.collection('products').drop();
  collection.insertMany(docArray);

  client.close();
});
