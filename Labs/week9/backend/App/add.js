module.exports = (collection, app) => {

    app.post('/api/add', (req, res) => {

        if(!req.body) {return res.sendStatus(400);}

        product = req.body;

        collection.find({'id':product.id}).count( (err, count) => {
            if ( count == 0 ) {
                collection.insertOne(product, (err, dbres) => {
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    res.send({'num':num, err:null});
                });
            } else {
                res.send({num:0, err:'Product ID already in the database!'});
            }
        });
    });
};
