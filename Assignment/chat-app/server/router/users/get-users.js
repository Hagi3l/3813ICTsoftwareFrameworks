module.exports = function(usersCollection, app) {

    app.get('/api/get-users', (req, res) => {

        console.log(req.body);
        usersCollection.find({}).toArray( (err, result) => {
            if(err) { return res.sendStatus(400); }
            return res.status(200).send({ username: data[0].username, email: data[0].email, role: data[0].role });
        });
    });
};
