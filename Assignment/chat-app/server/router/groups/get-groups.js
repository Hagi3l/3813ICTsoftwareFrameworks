module.exports = function(groupsCollection, app) {

    app.get('/api/get-groups', (req, res) => {

        groupsCollection.find({}).toArray( (err, result) => {
            if(err) { return res.sendStatus(400); }
            return res.send(result);
        });
    });
};
