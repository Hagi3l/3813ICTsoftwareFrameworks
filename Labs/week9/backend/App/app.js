const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const add = require('./add');
const read = require('./read');
const remove = require('./remove');
const update = require('./update');


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

  client.close();
});
