module.exports = function(channelsCollection, app, ObjectId) {

    app.post('/api/remove-active-user', (req, res) => {

        let objectid = ObjectId(req.body.channel_id);
        let userid = ObjectId(req.body.active_user);

        channelsCollection.updateOne({_id: objectid},{ $pull: { active_users: userid }}, (err) => {
            if(err) { return res.sendStatus(400); }
            return res.status(200).send("Channel active user successfully removed");
        });
    });
};
