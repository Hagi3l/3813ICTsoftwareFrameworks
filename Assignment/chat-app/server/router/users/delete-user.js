module.exports = function(usersCollection, app, ObjectId) {

    app.post('/api/delete-user', (req, res) => {

        usersCollection.deleteOne({_id: req.body.id}, (err, data) => {
            if(err) { return res.sendStatus(400); }
            return res.status(200).send(data);
        });
    });
};
