const { cpuUsage } = require("process");

exports.readDocument = function(collection, queryJSON, callback) {
    collection.find(queryJSON).toArray(function(err, docs) {
        console.log('Found the follow records');
        console.log(docs);
        callback(docs);
    });
};
