module.exports = function(usersCollection, app) {

    app.get('/api/get-users', (req, res) => {

        console.log(req.body);
        usersCollection.find({}).toArray( (err, result) => {
            if(err) { return res.sendStatus(400); }
            console.log(result);
            return res.send(result);
        });
    });
};
