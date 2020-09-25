module.exports = (collection, app) => {

    app.get('/api/getList', (req, res) => {
        collection.find({}).toArray( (err, data) => {
            console.log('Found records');
            res.status(200).send(data);
        });
    });
    
};
