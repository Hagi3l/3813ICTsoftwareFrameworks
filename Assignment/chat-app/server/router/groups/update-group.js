module.exports = function(usersCollection, groupsCollection, app, ObjectId) {

    app.post('/api/update-group', (req, res) => {

        let objectid = ObjectId(req.body.group_id);
        let ga = [];
        req.body.group_assistants.forEach(assistant => {
            ga.push(ObjectId(assistant));
        });
        let gu = [];
        req.body.group_users.forEach(user => {
            gu.push(ObjectId(user));
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
            console.log(result);
            return res.send(result);

            //TODO: error handling and proper responses!+
        });
    });
};
