# Appwrite

`https://appwrite.io/`

**Create an Organization and choose plan. For now use free plan**

1.  Create a project e.g
    a. with Web (TypeScript/Vanilla), React, Next.js, Vue.js, Solid, Refine, Nuxt, Sveltekit, Angular --- For Web App

    b. React Native, Flutter, Android, Apple --- For Mobile and Native

    c. Node.js, Python, .NET, Dart, Ruby, Deno, PHP, Kotlin, Swift --- For Server

2.  Start with Web first.

### Steps

1. Create project by:
2. Head to the Appwrite Console (Go to https://appwrite.io/console.).
3. Sign in or create an account if you don't have one.
4. Create a new organization if needed. (Give Id too e.g jedybrown0000$ for Jedybrown Ventures)
5. Choose the free plan to start.
6. Click on "Create Project".
7. Enter a project name and select a platform from the provided options (e.g., Web).Fill in the project name (e.g., "My First Project"). Add an Id or leave appwrite to give you a random one. Choose a deployment region for your project. This region cannot be changed.
   Choose "Web" as the platform if you are building a web application.
   Click on "Create".

###### Note:

```
When choosing a deployment region for your project, it's best to select a region that is geographically closest to you or your target users to minimize latency and improve performance.

For users in Nigeria, the closest options are typically in Europe. I like London but I guess free account have only Frankfurt as option.
```

8. First project is created with the name and Id e.g
   ```
   My First Project
   6670bced001681b60586
   ```
9. Add a Platform:

   ```
   In the project dashboard, click on "Add Platform".
   Choose "Web".
   ```

Hostname registration Details:

For the hostname:
a. Local Development: Enter localhost
b. Hosting on a Domain: Enter your domain name, e.g., example.com.

Note: Hostname is what your website will use to interact with Appwrite APIs in production or development environments. No protocol or port number is required.

Implications of Using "localhost"
Local Development:

By setting "localhost" as the hostname, Appwrite understands that your web application will make API requests to Appwrite from your local machine. This is common during the development phase when you're testing your application before deploying it to a live server.
Access Control Considerations:

Appwrite uses the hostname information to manage access control and security policies, such as CORS (Cross-Origin Resource Sharing). When you're using "localhost," it allows your web application running on your local development server to communicate with Appwrite without restrictions that might apply to domains hosted elsewhere.

```

```

10. Install the Appwrite Web SDK (Software Development Kit)
    a. using npm `npm install appwrite@14.0.1` or
    b. using CDN with a script tag
    `<script src="https://cdn.jsdelivr.net/npm/appwrite@14.0.1"></script>`

    Installing the Appwrite Web SDK allows you to integrate Appwrite's functionality into your web application, enabling interaction with Appwrite services such as authentication, database, storage, and more.

    Wait for npm to download and install the package. Once completed, you can start using the SDK in your project.

    Import and Use in your JavaScript/TypeScript files:

    After installation, you can import Appwrite modules in your JavaScript/TypeScript files as needed.

```
// Import Appwrite Client (if using npm or another module system)
import { Client } from 'appwrite'; or import { Client, Account, Database } from 'appwrite'; ---for many imports

// Initialize Appwrite Client
const client = new Client();

// Set Endpoint and Project
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite Endpoint
    .setProject('6670bced001681b60586'); // Replace with your Project ID

// Example: Using the initialized client
const account = new Appwrite.Account(client);
account.createSession('email@example.com', 'password')
    .then(response => console.log(response))
    .catch(error => console.error(error));

```

11. Initialize SDK

    Initialize your SDK by pointing the client to your Appwrite project using your Project ID

    e.g appwrite.js or index.js or main.js in root project

```
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6670bced001681b60586');
```

### Explanations

1. Importing Specific Modules:

`import { Client, Account, Database } from 'appwrite';`

Client, Account, and Database are individual modules exported by the appwrite package.

Each module represents a different part of the Appwrite SDK:

Client: Represents the main client used to interact with the Appwrite backend.

Account: Provides methods related to user authentication and account management.

Database: Offers functionality to interact with Appwrite databases for storing and retrieving data.

Benefits:

Efficiency: Importing specific modules can reduce the size of your bundle by only including the necessary functionality.

Clarity: Clearly indicates which parts of the SDK your file depends on, improving readability.

Usage:
Once imported, you can use each module independently in your JavaScript code:

```
const client = new Client();
const account = new Account(client);
const database = new Database(client);

// Example usage
account.createSession('email@example.com', 'password')
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

2. Importing the Entire Package:

Alternatively, you can import the entire appwrite package and access its components through the package's namespace:

`import { Client } from 'appwrite';`

Here, you're importing only the Client module from the appwrite package.
This method still allows you to access other modules within appwrite, but you'd need to reference them using the appwrite namespace.
Usage:

Example of usage with the entire package imported:

```
import appwrite from 'appwrite';

const client = new appwrite.Client();
const account = new appwrite.Account(client);
const database = new appwrite.Database(client);

// Example usage
account.createSession('email@example.com', 'password')
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

### Note:

###### Setting Endpoint and Project:

This configures the client instance with the endpoint URL and project ID of your Appwrite project. This is essential for the client to know where to send API requests and which project it belongs to.

```
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6670bced001681b60586");
```

###### Using the initialized client:

This creates an instance of Appwrite.Account using the initialized client. This allows you to perform operations related to user accounts and authentication.

`const account = new Appwrite.Account(client);`

###### Creating a Session:

This calls the createSession method on the account instance to authenticate a user session using their email and password.

```
account
    .createSession("email@example.com", "password")
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
```

createSession: Initiates a session for the specified user credentials (email@example.com and password). Upon successful authentication, the response object contains session details.
Handling Responses and Errors:

Uses .then() to handle the successful response from createSession, logging the response to the console.

Uses .catch() to handle any errors that occur during the session creation process, logging the error message to the console.

12. Build and this s done
    All is set.
    Congratulations on adding the first platform to your project! Start exploring by creating users, adding a database to your project, or uploading files to a bucket.

#### Metrics on Appwrite Dashboard

1. Bandwidth:

Description: Measures the amount of data transferred between your application and the Appwrite server.
Current State: 0 indicates no data has been transferred yet.
Action: Start making API requests (e.g., creating users, uploading files) to see this metric increase.

2. Requests:

Description: The number of API requests made by your application to the Appwrite server.
Current State: 0 requests means no API calls have been made yet.
Action: Perform actions like user authentication, database operations, or file uploads to generate API requests.

3. Database:

Documents: Number of documents stored in your Appwrite database.
Databases: Number of databases created in your project.
Current State: 0 documents and 0 databases indicate no databases or documents have been created.
Action: Create a database and add documents (data entries) using the Appwrite Database service.

4. Storage:

Buckets: Number of storage buckets created for storing files.
Current State: 0 buckets means no storage buckets have been created.
Action: Create a storage bucket and upload files using the Appwrite Storage service.

5. Auth:

Users: Number of registered users in your project.
Current State: 0 users indicates no users have registered or been created.
Action: Register users via your application or directly through the Appwrite Console using the Appwrite Account service.

6. Functions:

Executions: Number of times your Appwrite functions (serverless functions) have been executed.
Current State: 0 executions means no functions have been created or executed.
Action: Create and execute serverless functions using the Appwrite Functions service.

7. Realtime Connections:

Description: Number of active real-time connections to your Appwrite project.
Current State: 0 connections indicate no active real-time connections.
Action: Utilize Appwrite’s real-time features to track changes in documents, files, etc., in real-time.
