module.exports = function(usersCollection, app) {

    app.post('/api/add-new-user', (req, res) => {

        console.log(req.body);
        usersCollection.insertOne(req.body, (err, result) => {
            if(err) { return res.sendStatus(400); }
            console.log(result);
            return res.sendStatus(200);
        });
    });
};
