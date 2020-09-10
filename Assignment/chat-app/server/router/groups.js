module.exports = function(req, res) {

    const fs = require('fs');
    let ok = false;

    if (!req.body) {
        return res.sendStatus(400);
    }

    fs.readFile('./data/channels_groups.json', (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(JSON.parse(data).groups);
        }
    });

};


