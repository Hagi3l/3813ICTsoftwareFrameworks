module.exports = (usersCollection, groupsCollection, channelsCollection) => {

    // SEED User

    const user =
    {
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
            group_users: []
        },
        {
            group_name: "Fun",
            group_users: []
        },
        {
            group_name: "Aussie",
            group_users: []
        },
        {
            group_name: "Venezia",
            group_users: []
        }
    ];
    //SEED Channels

    const channels =
    [
        {
            channel_name: "private",
            group_id: null,
            channel_users: [],
            active_users: [],
            chat_history: []
        },
    ];


};




