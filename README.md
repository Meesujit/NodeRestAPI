# Rest API with Node.js
This repository contains a simple REST API built using Node.js for managing user data. The API supports JSON data and provides various endpoints for performing CRUD (Create, Read, Update, Delete) operations on user records.

## Endpoints
### 1. Get Users
- #### GET /users
- Renders an HTML document for desktop users.
- Returns JSON data for mobile users (accessed via /api/users).
### 2. Get Single User
- #### GET /api/users/:id
- Retrieves the user with the specified id.
### 3. Create User
- #### POST /api/users
- Creates a new user. Expects JSON data in the request body.
### 4. Edit User
- #### PATCH /api/users/:id
- Edits the user with the specified id. (TODO: Currently not functioning as expected.)
### 5. Delete User
- #### DELETE /api/users/:id
- Deletes the user with the specified id.
## Usage
### To use the API, follow the instructions below:

#### Install Dependencies and Run Code:

```bash

# Copy Repo 
git clone <url>

# Install Dependencies
npm install

# Run the Server:
npm start
``` 
### Access API Endpoints:

- For desktop users: Open the browser and navigate to /users.
- For mobile users: Access JSON data by visiting /api/users.
### Test Endpoints:

- Use tools like Postman to send requests to the various endpoints.
# TODO
- ### There are a few pending tasks and issues to be addressed:

- The PATCH request is currently not functioning as expected. Further investigation and debugging are required.
- Feel free to contribute by addressing the above issues or by adding new features to enhance the functionality of the REST API.

### Happy coding!
