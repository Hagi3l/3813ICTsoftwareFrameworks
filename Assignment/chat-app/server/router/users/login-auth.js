const bcrypt = require('bcrypt');

module.exports = (usersCollection, app) => {

    app.post('/api/login-auth', (req, res) => {

        usersCollection.find({ username: req.body.username }).toArray( (err, data) => {
            if(err) { return res.sendStatus(400); }
            if(data.length == 0) {
                return res.send({status: 400, data: "Username or Password not found"});
            }
            bcrypt.compare(req.body.password, data[0].password, (err, result) => {
                if(err) { return res.sendStatus(400); }
                if (result === true) {
                    return res.send({status: 200, data: { username: data[0].username, email: data[0].email, role: data[0].role }});
                } else {
                    return res.send({status: 400, data: "Username or Password not found"});
                }
            });
        });
    });
}

  //TODO:
    // set local session for persistance
