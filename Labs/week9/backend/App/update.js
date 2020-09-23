module.exports = (collection, app, ObjectID) => {
    
    var result;
    
    app.post('/api/update', (req, res) => {
        
        if (!req.body) { return res.sendStatus(400)}

        product = req.body;
        var objectid = new ObjectID(product.objid);

        collection.updateOne( {id:objectid}, { $set: {name:product.name, description:product.description, price: product.price, units:product.units} }, () => {
            res.send({'ok':product.objid});
        });
    });
};
