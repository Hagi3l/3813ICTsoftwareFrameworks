module.exports = function(groupsCollection, app) {

    app.get('/api/get-groups', (req, res) => {

        console.log(req.body);
        groupsCollection.find({}).toArray( (err, result) => {
            if(err) { return res.sendStatus(400); }
            console.log(result);
            return res.send(result);
        });
    });
};
