const bcrypt = require('bcrypt');

module.exports = function(usersCollection, app) {

    app.post('/api/add-new-user', (req, res) => {

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            usersCollection.insertOne({username: req.body.username, email: req.body.email, password: hash, role: req.body.role }, (err, result) => {
                if(err) { return res.sendStatus(400); }
                console.log(result);
                return res.sendStatus(200);
            });
        });

    });
};
