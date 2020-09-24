module.exports = (collection, app) => {

    app.get('/api/getList', (req, res) => {
        collection.find({}).toArray( (err, data) => {
            console.log('Found records');
            res.send(data);
        });
    });
    
};
