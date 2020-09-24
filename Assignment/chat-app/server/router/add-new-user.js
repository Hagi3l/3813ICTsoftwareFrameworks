module.exports = function(usersCollection, app) {

    app.post('/api/add-new-user', (req, res) => {

        console.log(req.body);
        usersCollection.insertOne(req.body, (err, result) => {
            if(err) { return res.sendStatus(400); }
            console.log(result);
            return res.sendStatus(200);
        });
    });





    //TODO:
    // check for user + pass in the collection
    // set local session for persistance




    // const fs = require('fs');
    // let ok = false;

    // if (!req.body) {
    //     return res.sendStatus(400);
    // }

    // fs.readFile('./data/account.json', (err, data) => {
    //   if (err) {
    //         throw err;
    //     }

    //     let findUser = JSON.parse(data).users.find(user => ((user.username == req.body.username) && (user.password == req.body.password)));

    //     if (findUser) {
    //         findUser.ok = true;
    //         findUser.password = "";
    //         console.log(findUser);
    //         res.send(findUser);
    //     } else {
    //       return res.send(ok);
    //     }
    // });
};
