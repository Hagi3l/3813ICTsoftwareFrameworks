module.exports = function(groupsCollection, app, ObjectId) {

    app.post('/api/delete-group', (req, res) => {

        let objectid = ObjectId(req.body.id);

        groupsCollection.deleteOne({_id: objectid}, (err, result) => {
            if(err) { return res.sendStatus(400); }
            if (result.result.n === 1) {
                return res.send(result);
            } else {
                return res.status(400).send({ code: 11, message: "Cannot delete group"});
            }
        });
    });
};
