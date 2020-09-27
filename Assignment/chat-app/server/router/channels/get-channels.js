module.exports = function(channelsCollection, app) {

    app.get('/api/get-channels/:data', (req, res) => {
        const data = req.params.data;
        console.log(data);
        channelsCollection.find({}).toArray( (err, result) => {
            if(err) { return res.sendStatus(400); }
            return res.send(result);
        });
    });
};
