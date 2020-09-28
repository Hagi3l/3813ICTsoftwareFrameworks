module.exports = function(usersCollection, app, ObjectId) {

    app.get('/api/users/:id', (req, res) => {
        let userId = ObjectId(req.params.id);
        usersCollection.findOne({_id: userId}, {projection: {password:0}}, (err, result) => {
            if(err) { return res.sendStatus(400); }
            return res.status(200).send(result);
        });
    });
};
