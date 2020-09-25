const bcrypt = require('bcrypt');

module.exports = function(usersCollection, app, ObjectId) {

    app.post('/api/update-user', (req, res) => {

        let objectid = ObjectId(req.body.id);
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            usersCollection.updateOne({_id: objectid}, { $set: {username: req.body.username, email: req.body.email, password: hash, role: req.body.role } }, (err, result) => {
                if(err) { return res.sendStatus(400); }
                console.log(result);
                return res.send(result);
            });
        });

    });
};
