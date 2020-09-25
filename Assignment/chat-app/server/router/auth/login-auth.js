const bcrypt = require('bcrypt');

module.exports = (usersCollection, app) => {

    app.post('/api/login-auth', (req, res) => {

        usersCollection.findOne({ username: req.body.username }, (err, data)  => {
            if(err) { return res.sendStatus(400); }
            if(data === null) {
                return res.status(400).send({message: "User not found"});
            }
            bcrypt.compare(req.body.password, data.password, (err, result) => {
                if(err) { return res.sendStatus(400); }
                if (result === true) {
                    return res.status(200).send({ username: data.username, email: data.email, role: data.role });
                } else {
                    return res.status(400).send({ message: "Password does not match"});
                }
            });
        });
    });
};

  //TODO:
    // set local session for persistance
