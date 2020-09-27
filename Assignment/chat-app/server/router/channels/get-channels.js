module.exports = function(channelsCollection, app) {

    app.get('/api/get-channels', (req, res) => {

        channelsCollection.find({}).toArray( (err, result) => {
            if(err) { return res.sendStatus(400); }
            return res.send(result);
        });
    });
};
