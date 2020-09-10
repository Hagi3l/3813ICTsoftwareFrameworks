module.exports = function(req, res) {

  let groups = [
    {
      'id': 1,
      'group_name': 'Elite',
      'users': [
        'super',
        'test'
      ]
    },
    {
      'id': 2,
      'group_name': 'Fun',
      'users': [
        'super'
      ]
    },
    {
      'id': 3,
      'group_name': 'Europe',
      'users': [
        'super'
      ]
    },
    {
      'id': 4,
      'group_name': 'Australia',
      'users': [
        'super'
      ]
    },
    {
      'id': 5,
      'group_name': 'Motorcycle Club',
      'users': [
        'super'
      ]
    },
  ];

  res.send(groups);

};


