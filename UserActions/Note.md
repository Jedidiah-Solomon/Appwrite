In summary, while both Users and Databases APIs are integral parts of Appwrite, they serve distinct purposes in application development. For user authentication, registration, and profile management, you primarily use the Users API. For storing and managing application data, structured collections are handled using the Databases API. This separation of concerns allows developers to build secure, scalable applications efficiently on the Appwrite platform.

## Error codes

```
200 OK: The request was successful.
400 Bad Request: The server could not understand the request due to invalid syntax.
401 Unauthorized: The client must authenticate itself to get the requested response.
403 Forbidden: The client does not have access rights to the content.
404 Not Found: The server can not find the requested resource.
409 Conflict: This indicates a conflict, such as a duplicate entry. For example, trying to create a user with an email that already exists.
500 Internal Server Error: The server has encountered a situation it doesn't know how to handle.
503 Service Unavailable: The server is not ready to handle the request, often due to maintenance or overload.
```

#### dotenv file

Ensue you list it in .gitignore, I just left this for learning only.

#### Sample Signup object

```
{
    "$id": "6673138a00285adbd1f3",
    "$createdAt": "2024-06-19T17:21:16.312+00:00",
    "$updatedAt": "2024-06-19T17:21:16.312+00:00",
    "name": "Peter Paul",
    "registration": "2024-06-19T17:21:16.308+00:00",
    "status": true,
    "labels": [],
    "passwordUpdate": "2024-06-19T17:21:16.308+00:00",
    "email": "jedybrown98s21@gmail.com",
    "phone": "",
    "emailVerification": false,
    "phoneVerification": false,
    "mfa": false,
    "prefs": {},
    "targets": [
        {
            "$id": "6673138c5d06f2da65a5",
            "$createdAt": "2024-06-19T17:21:16.381+00:00",
            "$updatedAt": "2024-06-19T17:21:16.381+00:00",
            "name": "",
            "userId": "6673138a00285adbd1f3",
            "providerId": null,
            "providerType": "email",
            "identifier": "jedybrown98s21@gmail.com"
        }
    ],
    "accessedAt": "2024-06-19T17:21:16.308+00:00"
}
```

Example Use Case:
Imagine a social networking application where each user can have multiple profiles (e.g., personal profile, professional profile, hobby profile). In this scenario:

Targets could represent each profile type associated with a user.
Each target ($id) would have specific attributes (name, providerType, identifier) that differentiate one profile from another.
Users could switch between profiles, update information specific to each profile, and manage access settings individually.

### AppwriteException

```
import { Client, Account, AppwriteException } from "appwrite";

const client = new Client();

// Use the .env codes
const appwriteEndpoint = process.env.VITE_APPWRITE_ENDPOINT;
const appwriteProjectId = process.env.VITE_APPWRITE_PROJECT_ID;



const login = async (email, password) => {
    try {
        const account = new Account(client);
        const session = await account.createEmailPasswordSession(email, password);
        console.log("Login successful:", session);
        // Optionally handle the session object (e.g., store in localStorage)
        return session;
    } catch (error) {
        const appwriteError = error as AppwriteException;
        throw new Error(appwriteError.message);
    }
}
```

### Each User Session have:

`BROWSER AND DEVICE	SESSION	LOCATION	IP`

1. BROWSER AND DEVICE : E.g Chrome 126.0 on Windows 10
2. SESSION e.g browser
3. LOCATION e.g United Kingdom
4. IP e.g 105.115.3.12

Update user's phone. Phone number must start with '+' and maximum of 15 digits, for example: +14155552671.

Password: A password must contain at least 8 characters. You can add your own authentication requirement e.g using a pattern.

### CreateVerification Object

```
{
    "$id": "6673433def9c2d78c3b2",
    "$createdAt": "2024-06-19T20:44:45.981+00:00",
    "userId": "667323df001d7faa8919",
    "secret": "",
    "expire": "2024-06-19T21:44:45.981+00:00",
    "phrase": ""
}
``
```

### Setting up Mailgun
