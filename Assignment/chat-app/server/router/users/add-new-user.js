const bcrypt = require('bcrypt');

module.exports = function(usersCollection, app) {

    app.post('/api/add-new-user', (req, res) => {

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            usersCollection.insert({username: req.body.username, email: req.body.email, password: hash, role: req.body.role }, (err, result) => {
                if(err) {
                    if (err.code == 11000) {
                        return res.status(400).send({ code: 10, message: "Username taken"});
                    }
                    return res.sendStatus(400);
                }
                return res.sendStatus(200);
            });
        });
    });
};
