module.exports = (usersCollection, groupsCollection, channelsCollection, ObjectID) => {

    // Dropping collections before seeding
    usersCollection.drop();
    groupsCollection.drop();
    channelsCollection.drop();

    // SEED User

    const userID = ObjectID;

    const user =
    {
        _id: userID,
        username: "super",
        email: "super@privetchat.com",
        password: "super-pwd",
        role: "super-admin"
    };

    usersCollection.insertOne(user);


    // SEED Groups

    const groups =
    [
        {
            group_name: "Elite",
            group_users: [
                {
                    users_id: userID,
                }
            ]
        },
        {
            group_name: "Fun",
            group_users: [
                {
                    users_id: userID,
                }
            ]
        },
        {
            group_name: "Aussie",
            group_users: [
                {
                    users_id: userID,
                }
            ]
        },
        {
            group_name: "Venezia",
            group_users: [
                {
                    users_id: userID,
                }
            ]
        }
    ];

    groupsCollection.insertMany(groups);

    //SEED Channels

    const channels =
    {
        channel_name: "private",
        group_id: null,
        channel_users: [
            {
                users_id: userID,
            }
        ],
        active_users: [],
        chat_history: []
    };

    channelsCollection.insertOne(channels);


};




