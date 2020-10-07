# Privet Chat


Privet chat is a socket.io discord clone.


## Features
- Communicate with users from the same channel
- Admin Panel
-- Used to add new channels and groups
-- Ability to remove or add a user from channels and groups
- Slick design


## Installation
```sh
npn install -d
ng serve
cd ./server
nodemon server.js
```
## Testing
Testing is completed by the help from Chai and Karma 
```sh
npm run-script test
npm run-script unitTest
ng test
```


### Git Layout
From the beginning of the trimester, I have taken the per assessment approach for version control. In other words, for each assessment item, I create a new branch and proceed to do the work required for that workshop or assignment piece. This approach limits the number of branches needed to be created seeing as the content and requirements per item isn’t much. In a project that has more moving parts and requirements, an optimum approach would be to create a new branch for each new feature.

>To summarise the above, a new branch is created per assessment item (Labs and Assignments). 

### Data Structures
The main data structures used throughout the application would have to be Arrays and Objects. These data structures are fundamental to the operation of most components in the application. Arrays are used to store the Objects which when broken down consists of user ids or usernames or even chat history.

### REST API Routes

| Route (/api) | Request Type | Parameters | Return values | Description |
| ------ | ------ | ------ | ------ | ------ |
| /users | GET | nil | [{ users }] | Gets an array of all users from MongoDB. |
| /add-new-user | POST | username, email, password, role |	nil |	Adds a new user to the users' collection. |
| /update-user | POST | id, username, email, password, role |	{ result: ok }	|Updates certain users details. |
| /delete-user | POST | id	{ result: ok }|	Deletes a user from the user collection.|
| /get-groups | GET	| Nil|	[{ groups } ]|	Retrieves all groups in the collection.|
| /add-new-group | POST|	user_id, group_name, group_assistants, group_users|	{ result: ok }|	A certain user can create a new group.|
| /delete-group | POST|	id|	{ result: ok }|	Deletes a group from the group collection.|
| /update-group | POST|	group_id, group_name, group_assistants, group_users|	{ result: ok }|	Updates the selected group and returns success or errors.|
| /login-auth | POST|	username, password|	{ code: 1, message: “User not found” } or { code: 2, message: “Password wrong” } or [{ user details }]	|Checks the database against the user’s username and password to that of the form data.|
| get-channels/{group_id} | GET|	group_id|	[{ channels }]|	Returns all channels associated with the group.|
| /add-new-channel | POST|	channel_name, group_id, channel_users, active_users|	“Channel has been successfully added”|	Adds a new channel to the group.|
| /update-channel | POST|	channel_id, channel_name, channel_users|	{ result: ok }|	Updates the specific channel.|
| /delete-channel | POST|	Channel_id|	{ result: ok }|	Deletes the specific channel|
| /save-chat-history | POST|	channel_id, chat_history: { username, message }|	{ result: ok }|	Saves chat history to the specific channel|
| /add-active-user | POST|	channel_id, active_user|	{ result: ok }|	Appends a new active user to the channel|
| /remove-active-user | POST|	channel_id, active_user|	{ result: ok }|	Removes the active user from the channel|

### Angular Architecture
Below are all Components, Services and Interceptors that have been used throughout the project. They all play a major role in the functionality of the project.
Account Component: Shows the user their current details, including their role.
###### Admin-Page Component: 
The admin page is an integral section to the functionality of the chat application. It serves as the home ground to all admins and group assistants where they can add new users to a channel or group and even create new channels and groups. The component communicates with several services to execute varies tasks which in turn visually outputs the results to the admins. There are several sections where an admin has permission to alter groups and channels provided their role meets criteria.
###### Chat Component:
Houses the functionality required for users to interact with the GUI and have the chance to communicate with one another. 
###### Login Component: 
Displays a login screen to any user that attempts to access restricted sections of the application. This component then communicates with a service which returns the result from the server.
###### Navbar Component:
Key component which serves all other components with a beautiful navbar.

###### Group-Channel Service:
Stores all functionality necessary to retrieve calls from components and forwarding the data to the server. This data is then returned to the component it came from.
###### Socket Service:
Stores all functions required for the magical communication to occur.
###### User-Data Service: 
Stores all functions required for user data to be retrieved from the MongoDB database.
###### API-HTTP Interceptor:
Intercepts all Http call attempts which reduces redundant code and allows it to be built up for security.

## Creator
Valentin Evdokimenko
Software Frameworks 3813ICT - 2020
08/10/2020

License
----

MIT
