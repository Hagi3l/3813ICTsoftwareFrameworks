module.exports = function(req, res) {

    let userArray = [
    {
      'userid': 1,
      'username': 'jon',
      'birthdate': '15/02/1990',
      'age': 20,
      'email': 'jon@gmail.com',
      'password': 'jon20',
      'ok': null
    },
    {
      'userid': 2,
      'username': 'lisa',
      'birthdate': '01/01/1991',
      'age': 21,
      'email': 'lisa@gmail.com',
      'password': 'lisa21',
      'ok': null
    },
    {
      'userid': 3,
      'username': 'tom',
      'birthdate': '12/06/1992',
      'age': 19,
      'email': 'tom@gmail.com',
      'password': 'tom19',
      'ok': null
    }
  ];

  let i = userArray.findIndex(user => ((user.email == req.body.username) && (user.password == req.body.password)));

  if (i == -1) {
    res.send({'ok': false});
  } else {
    userArray[i].ok = true;
    let user = userArray[i];
    res.send(user);
  }

};


