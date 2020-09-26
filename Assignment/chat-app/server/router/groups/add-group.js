module.exports = function(usersCollection, groupsCollection, app, ObjectId) {

    app.post('/api/add-new-group', (req, res) => {

        let objectid = ObjectId(req.body.id);

        usersCollection.findOne({_id: objectid}, (err, data) => {
            if (data.role == "super-admin" || data.role == "group-admin") {
                console.log('added by a super-admin or group-admin');
                groupsCollection.insertOne({group_name: req.body.group_name, group_admins: ["super-admin", "group-admin"],  group_users: [] }, (err, result) => {
                    if(err) {return res.sendStatus(400);}
                    return res.sendStatus(200);
                });
            } else {
                return res.status(400).send({ code: 12, message: "Unauthorised Operation"});
            }
        });
    });
};
