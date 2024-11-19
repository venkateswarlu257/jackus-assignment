Front-end Setup

Navigate to the client folder:
cd ../client


Install dependencies:
npm install


Start the React application:
npm start


The application will open in your default browser at http://localhost:3000.

Back-end Setup


Navigate to the server folder:
cd server


Install dependencies:
npm install

Start MongoDB: Ensure MongoDB is running locally on mongodb://localhost:27017. Modify the connection string in server/index.js if needed.

Start the server:
npm start


The server will start at http://localhost:5000.

API Endpoints
The back-end server exposes the following RESTful API endpoints:

Method	   Endpoint	       Description
POST	   /users	       Create a new user
GET	       /users	       Retrieve all users
PUT	       /users/:id	   Update an existing user by ID
DELETE	   /users/:id	   Delete an existing user by ID


Project Structure

Back-end
server/models/userModel.js: Defines the User schema for MongoDB.
server/index.js: Contains Express server logic, routes, and database connection.

Front-end
client/src/components/UserList.js: Displays the list of users with edit and delete options.
client/src/components/UserForm.js: Form component for adding or editing a user.
client/src/App.js: Main React component that handles form toggling and user actions.


Run Back-end
cd server
npm start

Run Front-end
cd client
npm start