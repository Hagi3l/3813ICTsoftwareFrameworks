module.exports = function(channelsCollection, app, ObjectId) {

    app.post('/api/update-channel', (req, res) => {

        let objectid = ObjectId(req.body.channel_id);
        let cu = [];

        req.body.channel_users.forEach(user => {
            cu.push(ObjectId(user));
        });

        channelsCollection.updateOne(
            {_id: objectid},
            { $set: {
                channel_name: req.body.channel_name,
                channel_users: cu,
            }
        }, (err) => {
            if(err) { return res.sendStatus(400); }
            return res.status(200).send("Channel has successfully updated");
        });
    });
};
