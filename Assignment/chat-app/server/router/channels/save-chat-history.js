module.exports = function(channelsCollection, app, ObjectId) {

    app.post('/api/save-chat-history', (req, res) => {

        let objectid = ObjectId(req.body.channel_id);

        let ch = [];

        req.body.chat_history.forEach(chat => {
            ch.push({
                "user_id": ObjectId(chat.user_id),
                "message": chat.message,
                "timestamp": chat.timestamp
            });
        });

        channelsCollection.updateOne({_id: objectid},{ $push: { chat_history: { $each: ch }}}, (err) => {
            if(err) { return res.sendStatus(400); }
            return res.status(200).send("Channel chat history successfully inserted");
        });
    });
};
