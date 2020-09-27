module.exports = function(channelsCollection, app, ObjectId) {

    app.get('/api/get-channels/:data', (req, res) => {
        let objectid = ObjectId(req.params.data);
        channelsCollection.find({group_id: objectid}).toArray( (err, result) => {
            if(err) { return res.sendStatus(400); }
            return res.send(result);
        });
    });
};
