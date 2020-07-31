
var customers = [
    {
        email: "jon@gmail.com",
        password: "123"
    },
    {
        email: "james@gmail.com",
        password: "321"
    },
    {
        email: "tony@gmail.com",
        password: "432"
    }
];

function authenticate(email, password) {

    return customers.some(item => email == item.email && password == item.password);

}

module.exports = function(app, path) {
   
    app.get('/account', function(req, res) {
      
        const filepath = path.resolve('./www/account.html');
        res.sendFile(filepath);

    });


    app.post('/login', function(req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        
        const authenticated = authenticate(req.body.email, req.body.pwd);

        res.send({
            valid: authenticated
        });
    });

};