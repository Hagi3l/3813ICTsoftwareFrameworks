module.exports = function(channelsCollection, app, ObjectId) {

    app.post('/api/save-chat-history', (req, res) => {

        let objectid = ObjectId(req.body.channel_id);

        channelsCollection.updateOne({_id: objectid},{ $push: { chat_history:  req.body.chat_history }}, (err, result) => {
            if(err) { return res.sendStatus(400); }
            return res.send(result);
        });
    });
};
