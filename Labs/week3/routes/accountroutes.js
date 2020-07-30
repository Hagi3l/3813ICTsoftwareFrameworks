
module.exports = function(app, path) {
    app.get('/login', function(req, res) {
        const filepath = path.resolve('./www/login.html');
        res.sendFile(filepath);
    });

    app.get('/account', function(req, res) {
        const filepath = path.resolve('./www/account.html');
        res.sendFile(filepath);
    });
};