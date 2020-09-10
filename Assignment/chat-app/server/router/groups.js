module.exports = function(req, res) {

    const fs = require('fs');

    if (!req.body) {
        return res.sendStatus(400);
    }

    fs.readFile('./data/channels_groups.json', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log(JSON.parse(data).groups);
            console.log(JSON.parse(data).channels);
            res.send(JSON.parse(data).groups);
        }
    });

};


