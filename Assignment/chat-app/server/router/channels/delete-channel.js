module.exports = function(channelsCollection, app, ObjectId) {

    app.post('/api/delete-channel', (req, res) => {

        let objectid = ObjectId(req.body.channel_id);
        channelsCollection.deleteOne({_id: objectid}, (err, result) => {
            if(err) { return res.sendStatus(400); }
            if (result.deletedCount == 1) {
                return res.send(result);
            } else {
                return res.status(400).send({ code: 11, message: "Cannot delete channel"});
            }
        });
    });
};
