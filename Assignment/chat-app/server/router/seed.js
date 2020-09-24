const bcrypt = require('bcrypt');

module.exports = (usersCollection, groupsCollection, channelsCollection, ObjectID) => {

    // Dropping collections before seeding
    usersCollection.drop();
    groupsCollection.drop();
    channelsCollection.drop();

    // SEED User

    let userID;
    let userPW;

    bcrypt.hash("super-pwd", 10, (err, hash) => {
        userPW = hash;

        usersCollection.insertOne(
            {
                "_id": ObjectID,
                "username": "super",
                "email": "super@privetchat.com",
                "password": userPW,
                "role": "super-admin"
            }, (err, data) => {
            // console.log(data);
            // userID = ObjectID(data.insertedId);
            usersCollection.find({}).toArray( (err, data) => {
                userID = data[0]._id.str;

                groupsCollection.insertMany(
                    [
                        {
                            "group_name": "Elite",
                            "group_users": [ userID ]
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




