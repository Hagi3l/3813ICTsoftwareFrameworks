module.exports = (collection, app) => {

    app.post('/api/checkID', (req, res) => {
        if(!req.body) { return res.sendStatus(400) }

        productID = req.body.productid;
        console.log(productID);
        collection.find({'id':productID}).count( (err, count) => {
            if(err) { return res.sendStatus(400) }
            console.log(count);
            if (count == 1) {
                res.send({ success: 1, topnum: 0 });
            } else {
                collection.find({}, {sort: {id: -1}, limit: 1}).toArray( (err, items) => {
                    res.send({success: 0, topnum: items[0].id});
                });
            }          
        });
    });
};
