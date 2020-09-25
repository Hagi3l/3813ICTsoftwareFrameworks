module.exports = (collection, app) => {

    app.get('/api/getList', (req, res) => {
        collection.find({}).toArray( (err, data) => {
            res.send(data);
        });
    });
};
