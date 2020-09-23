module.exports = (collection, app, ObjectId) => {

    app.post('/api/getItem', (req, res) => {
        if(!req.body) { return res.sendStatus(400) }

        productID = req.body.productid;

        let objectid = ObjectId(productID);

        collection.find({_id:objectid}, (err, result) => {
            if(err) { return res.sendStatus(400) }
            res.send(data);            
        });
    });
};
