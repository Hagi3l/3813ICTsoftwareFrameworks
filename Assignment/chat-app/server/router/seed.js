const bcrypt = require('bcrypt');

module.exports = (usersCollection, groupsCollection, channelsCollection, ObjectId) => {

    // Dropping collections before seeding
    usersCollection.drop();
    groupsCollection.drop();
    channelsCollection.drop();

    usersCollection.createIndex( { "username": 1 }, { unique: true } );

    // SEED User

    let userID;
    let userPW;

    bcrypt.hash("super-pwd", 10, (err, hash) => {
        userPW = hash;

        usersCollection.insertOne(
            {
                "_id": ObjectId,
                "username": "super",
                "email": "super@privetchat.com",
                "password": userPW,
                "role": "super-admin"
            }, () => {

            usersCollection.find({}).toArray( (err, data) => {
                userID = data[0]._id;

                groupsCollection.insertMany(
                    [
                        {
                            "group_name": "Elite",
                            "group_users": [
                                {
                                    "users_id": userID,
                                }
                            ]
                        },
                        {
                            "group_name": "Fun",
                            "group_users": [
                                {
                                    "users_id": userID,
                                }
                            ]
                        },
                        {
                            "group_name": "Aussie",
                            "group_users": [
                                {
                                    "users_id": userID,
                                }
                            ]
                        },
                        {
                            "group_name": "Venezia",
                            "group_users": [
                                {
                                    "users_id": userID,
                                }
                            ]
                        }
                    ]
                );
                channelsCollection.insertOne(
                    {
                        "channel_name": "private",
                        "group_id": null,
                        "channel_users": [
                            {
                                "users_id": userID,
                            }
                        ],
                        "active_users": [],
                        "chat_history": []
                    }
                );
            });
        });
    });
};




