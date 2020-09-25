module.exports = function(usersCollection, app, ObjectId) {

    app.post('/api/remove-user', (req, res) => {

        let objid = ObjectId(req.body.id);

        usersCollection.removeOne({_id: objid}, (err, data) => {
            if(err) { return res.sendStatus(400); }
            console.log(data);
            return res.status(200).send(data);
        });
    });
};
