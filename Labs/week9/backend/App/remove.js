module.exports = (collection, app, ObjectId) => {

    app.post('/api/remove', (req, res) => {
        if(!req.body) {return res.sendStatus(400);}

        productID = req.body.productid;

        let objectid = ObjectId(productID);

        collection.deleteOne({_id:objectid}, (err, result) => {
            console.log("Removed Entry");
            collection.find({}).toArray((err, data) => {
                res.send(data);
            });
        });
    });
};
