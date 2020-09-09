module.exports = function(req, res) {

  let users = [
  {
    'id': 1,
    'username': 'super',
    'email': 'super@privetchat.com',
    'password': 'super',
    'ok': null
  }
];

let userIndex = users.findIndex(user => ((user.username == req.body.username) && (user.password == req.body.password)));

if (userIndex == -1) {
  console.log('cant find the user');
  res.send({'ok': false});
} else {
  users[userIndex].ok = true;
  let user = users[userIndex];
  res.send(user);
}

};


