module.exports = function(usersCollection, app) {

    app.get('/api/users/', (req, res) => {
        usersCollection.find({}, {projection: {password:0}}).toArray( (err, result) => {
            if(err) { return res.sendStatus(400); }
            return res.status(200).send(result);
        });
    });
};
