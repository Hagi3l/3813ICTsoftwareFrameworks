module.exports = function(channelsCollection, app, ObjectId) {

    app.post('/api/add-new-channel', (req, res) => {

        let objectid = ObjectId(req.body.group_id);

        channelsCollection.insertOne({channel_name: req.body.channel_name, group_id: objectid, channel_users: [], active_users: [], chat_history: [] }, (err, result) => {
            if(err) {return res.sendStatus(400);}
            return res.send(result);
        });
    });
};
