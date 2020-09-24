module.exports = (collection, app, ObjectId) => {
    
    var result;
    
    app.post('/api/update', (req, res) => {
        
        if (!req.body) { return res.sendStatus(400)}

        product = req.body;
        var objectid = ObjectId(product.objid);
        collection.updateOne( {_id:objectid}, { $set: {name:product.name, description:product.description, price: product.price, units:product.units} }, (err) => {
          if(err) { return res.sendStatus(400) }
          res.send({'ok':product.objid});
        });
    });
};
