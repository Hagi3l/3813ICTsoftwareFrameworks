module.exports = function(usersCollection, groupsCollection, app, ObjectId) {

    app.post('/api/update-group', (req, res) => {

        let objectid = ObjectId(req.body.group_id);
        let ga = [];
        req.body.group_assistants.forEach(assistant => {
            ga.push(ObjectId(assistant._id));
        });
        let gu = [];
        req.body.group_users.forEach(user => {
            gu.push(ObjectId(user._id));
        });


        groupsCollection.updateOne(
            {_id: objectid},
            { $set: {
                group_name: req.body.group_name,
                group_assistants: ga,
                group_users: gu
            }
        }, (err, result) => {
            if(err) { return res.sendStatus(400); }
            return res.send(result);
        });
    });
};
