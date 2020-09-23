exports.updateDocument = function(collection, queryJSON, updateJSON, callback) {
    collection.updateOne(queryJSON, { $set: updateJSON }, function(err, result) {
        console.log('Updated document with');
        console.log(queryJSON);
        console.log('SET: ');
        console.log(updateJSON);
        callback(result);
  });
};
