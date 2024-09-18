# User Management API

This is a simple Express.js application that provides a REST API for managing users. The application allows you to get a list of users, get user details by ID, create new users, update existing users, and delete users.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/user-management-api.git
   ```

2. Navigate to the project directory:
   ```sh
   cd user-management-api
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

### Usage

1. Start the server:
   ```sh
   node app.js
   ```

2. The server will start running on `http://localhost:8000`.

### Endpoints

#### 1. Get List of Users

- **URL**: `/api/users`
- **Method**: `GET`
- **Description**: Returns a JSON array of all users.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      ...
    },
    ...
  ]
  ```

#### 2. Get User Names

- **URL**: `/users`
- **Method**: `GET`
- **Description**: Returns an HTML list of user names.
- **Response**:
  ```html
  <ul>
    <li>John</li>
    ...
  </ul>
  ```

#### 3. Get User Details by ID

- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Description**: Returns the details of a user specified by ID.
- **Response**:
  ```json
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    ...
  }
  ```

#### 4. Manage User by ID

- **URL**: `/api/user/:id`
- **Methods**: `GET`, `PATCH`, `DELETE`
- **Descriptions**:
  - `GET`: Returns the details of a user specified by ID.
  - `PATCH`: Updates the details of a user specified by ID.
  - `DELETE`: Deletes a user specified by ID.
- **Response**:
  - `GET`: Returns the user details.
  - `PATCH`:
    ```json
    {
      "status": "success"
    }
    ```
  - `DELETE`:
    ```json
    {
      "status": "Pending"
    }
    ```

#### 5. Create New User

- **URL**: `/api/users`
- **Method**: `POST`
- **Description**: Creates a new user and adds it to the list.
- **Request Body**:
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    ...
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "id": 2
  }
  ```

## Middleware

- **express.urlencoded**: Parses incoming requests with URL-encoded payloads.

## Data

- The user data is stored in a JSON file named `MOCK_DATA.json`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.