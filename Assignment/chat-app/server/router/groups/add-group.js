module.exports = function(groupsCollection, app, ObjectId) {

    app.post('/api/add-new-group', (req, res) => {

        let objectid = ObjectId(req.body.id);

        groupsCollection.insertOne({group_name: req.body.group_name, group_admins: ["super-admin", "group-admin", objectid],  group_users: [] }, (err, result) => {
            if(err) {
                if (err.code == 11000) {
                    return res.status(400).send({ code: 10, message: "Username taken"});
                }
                return res.sendStatus(400);
            }
            return res.sendStatus(200);
        });
    });
};
