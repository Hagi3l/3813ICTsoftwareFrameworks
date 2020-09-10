module.exports = function(req, res) {

    const fs = require('fs');

    if (!req.body) {
        return res.sendStatus(400);
    }

    fs.readFile('./data/account.json', (err, data) => {
      if (err) {
            throw err;
        }

        let findUser = JSON.parse(data).users.find(user => ((user.username == req.body.username) && (user.password == req.body.password)));

        if (findUser) {
            findUser.ok = true;
            findUser.password = "";
            console.log(findUser);
            res.send(findUser);
        }
    });






    // let userIndex = users.findIndex(user => ((user.username == req.body.username) && (user.password == req.body.password)));

    // if (userIndex == -1) {
    // console.log('cant find the user');
    // res.send({'ok': false});
    // } else {
    // users[userIndex].ok = true;
    // let user = users[userIndex];
    // res.send(user);
    // }
};
