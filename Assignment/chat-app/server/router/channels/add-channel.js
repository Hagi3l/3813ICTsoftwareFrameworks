module.exports = function(channelsCollection, app, ObjectId) {

    app.post('/api/add-new-channel', (req, res) => {

        let objectid = ObjectId(req.body.group_id);
        let cau = [];
        let cu = [];

        req.body.active_users.forEach(user => {
            cau.push(ObjectId(user));
        });
        req.body.channel_users.forEach(user => {
            cu.push(ObjectId(user));
        });

        channelsCollection.insertOne({channel_name: req.body.channel_name, group_id: objectid, channel_users: cu, active_users: cau, chat_history: [] }, (err, result) => {
            if(err) {return res.sendStatus(400);}
            return res.status(200).send("Channel has been successfully added.");
        });
    });
};
