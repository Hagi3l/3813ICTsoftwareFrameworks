


exports.addDocument = function(collection, docArray, callback) {
    collection.insertMany(docArray, function(err, result) {
        console.log('Inserted docs to the collection');
        console.log(docArray);
        callback(result);
    });
};
