module.exports = function(channelsCollection, app, ObjectId) {

    app.post('/api/add-new-channel', (req, res) => {

        let objectid = ObjectId(req.body.group_id);
        let cu = [];

        req.body.channel_users.forEach(user => {
            cu.push(ObjectId(user));
        });

        channelsCollection.insertOne({channel_name: req.body.channel_name, group_id: objectid, channel_users: cu, active_users: [], chat_history: [] }, (err, result) => {
            if(err) {return res.sendStatus(400);}
            return res.status(200).send("Channel has been successfully added.");
        });
    });
};
