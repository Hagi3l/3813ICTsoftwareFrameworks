const bcrypt = require('bcrypt');

module.exports = (usersCollection, app) => {

    app.post('/api/login-auth', (req, res) => {

        console.log(req.body);

        usersCollection.find({ username: req.body.username }).toArray( (err, result) => {
            if(err) { return res.sendStatus(400); }
            console.log(result);
            bcrypt.compare(req.body.password, result[0].password, (err, result) => {
                if(err) { return res.sendStatus(400); }
                if (result === true) {
                    console.log("Login Approved!");
                    return res.sendStatus(200);
                } else {
                    console.log("Invalid username or password");
                    return res.send({status: 400, message: "Username or Password not found"});
                }
            });
        });
    });
}

  //TODO:
    // check for user + pass in the collection
    // set local session for persistance
