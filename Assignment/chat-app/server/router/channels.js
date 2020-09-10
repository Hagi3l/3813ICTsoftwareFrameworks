module.exports = function(req, res) {

  let channels = [
    {
      'id': 1,
      'channel_name': 'Private',
      'group_id': 1,
      'users': [
        'super'
      ]
    },
    {
      'id': 2,
      'channel_name': 'join me',
      'group_id': 1,
      'users': [
        'super'
      ]
    },
    {
      'id': 3,
      'channel_name': 'dammmm',
      'group_id': 1,
      'users': [
        'super'
      ]
    },
    {
      'id': 4,
      'channel_name': 'wow',
      'group_id': 1,
      'users': [
        'super'
      ]
    },
    {
      'id': 5,
      'channel_name': 'quick Club',
      'group_id': 2,
      'users': [
        'super'
      ]
    },
  ];

  res.send(channels);

};


