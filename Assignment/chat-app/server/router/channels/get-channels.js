module.exports = function(channelsCollection, app, ObjectId) {

    app.get('/api/get-channels/:group_id', (req, res) => {
        let objectid = ObjectId(req.params.group_id);
        channelsCollection.find({group_id: objectid}).toArray( (err, result) => {
            if(err) { return res.sendStatus(400); }
            return res.send(result);
        });
    });
};
