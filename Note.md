# APPWRITE

Appwrite is an end-to-end backend server for Web, Mobile, Native, or Backend apps packaged as a set of Docker microservices. Appwrite abstracts the complexity and repetitiveness required to build a modern backend API from scratch and allows you to build secure apps faster.
Appwrite is a new open-source, end-to-end, back end server for front-end and mobile developers that allows you to build apps much faster. Its goal is to abstract and simplify common development tasks behind REST APIs and tools, helping developers build advanced apps faster.

Appwrite is an open-source backend-as-a-service (BaaS) platform designed to make it easier to build secure and scalable applications. It provides various services like databases, authentication, storage, and more, allowing you to focus on the frontend and business logic of your application.

Build your entire backend within minutes and scale effortlessly using Appwrite's open-source platform. Add Authentication, Databases, Functions, Storage, and Messaging to your projects using the frameworks and languages of your choice.
Your backend, minus the hassle
Build secure and scalable applications with less code. Add authentication, databases, storage, and more using Appwrite's development platform.

### Auth

Secure login for all users
Authenticate users securely with multiple login methods like Email/Password, SMS, OAuth, Anonymous, Magic URLs and more.

30+ login methods
Support for teams, roles and user labels
Rate-limits and advanced user protection
Custom SMTP and email templates

### Databases

Store, query and manage data
Scalable and robust database backed by your favorite technologies.

Never paused
Fast in-memory caching
Advanced permission models
Custom data validation
Relationships support

### Functions

Customize and extend your backend
Deploy and scale serverless functions in secure, isolated runtimes.

Automatic deployment from GitHub
Trigger using GitHub, CLI, Event Listeners or HTTP requests
Support for 30+ runtimes in 13 languages
Custom domain support

### Storage

Upload and manage files
Securely store files with advanced compression, encryption and image transformations.

File encryption at rest and transit
Built-in image transformation capabilities
Advanced compression with WebP/Brotli support

### Realtime

Realtime events for every service
Subscribe and react to any Appwrite event using the Realtime API.

Unlimited subscriptions
Built-in permission management
Support for DBs, Auth, Storage & Functions

### Webhooks

Appwrite Webhooks are designed to allow you to integrate custom behavior for your back end, easily and conveniently.

Want to receive an SMS when a new user registers to your app? Want to purge the cache when one of your app documents gets updates? Just add a new webhook that triggers an HTTP endpoint on your end when the specific Appwrite event triggers. Using Appwrite Webhooks you’re only limited by your imagination.

### Email and Password

Email and password login is the most commonly used authentication method. Appwrite Authentication promotes a safer internet by providing secure APIs and promoting better password choices to end users. Appwrite supports added security features like blocking personal info in passwords, password dictionary, and password history to help users choose good passwords.

## Signup

You can use the Appwrite Client SDKs to create an account using email and password.

```
import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<PROJECT_ID>');               // Your project ID

const account = new Account(client);

const promise = account.create('[USER_ID]', 'email@example.com', '');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
```

#### Explanation:

1.  Import Modules:
    import { Client, Account, ID } from "appwrite";
    Client: Used to initialize the Appwrite client with your endpoint and project ID.
    Account: Provides methods to manage user accounts.
    ID: Utility to generate unique IDs.

2.  Set Up Client:

    ```
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('<PROJECT_ID>');               // Your project ID
    ```

    setEndpoint: Configures the API endpoint for Appwrite.
    setProject: Sets the project ID to link the requests to a specific project.

3.  Initialize Account:
    `const account = new Account(client);`

    account: Creates an instance of the Account class to manage user account operations.

4.  Creating a User Account
    Create Account:

        `const promise = account.create('[USER_ID]', 'email@example.com', 'password');`

    account.create: Method to create a new user account.

    [USER_ID]: Placeholder for the user ID. This can be a unique identifier generated using ID.unique() from the ID utility.

    email@example.com: User's email address.
    password: User's password.

5.  Handle Response:

```
promise.then(function (response) {
console.log(response); // Success
}, function (error) {
console.log(error); // Failure
});
```

then: A promise method to handle success and failure responses.
response: Logs the successful account creation response.
error: Logs any errors that occurred during the account creation process.

Passwords are hashed with Argon2, a resilient and secure password hashing algorithm.

#### Verification

```
// Send verification email
account
  .createVerification("http://localhost:5500/src/pages/verify.html")
  .then(() => {
    console.log("Verification email sent");
    alert(
      "Verification email sent! Please check your email to verify your account."
    );
    setTimeout(() => {
      window.location.href = "/src/pages/login.html";
    }, 5000); // 5-second delay
  })
  .catch((error) => {
    console.error("Error sending verification email:", error);
    alert("Error sending verification email: " + error.message);
  });
```

##### Explanation

```
account.createVerification: This method sends a verification email to the user.
"http://localhost:5500/src/pages/verify.html": This is the URL that the user will be directed to after clicking the verification link in their email. This URL includes the verification token and user ID as query parameters.
.then(() => { ... }): This callback is executed if the verification email is sent successfully.
console.log("Verification email sent"): Logs a success message to the console.
alert("Verification email sent!..."): Displays an alert message informing the user that a verification email has been sent.
setTimeout(() => { ... }, 5000): Sets a timeout to redirect the user to the login page (/src/pages/login.html) after 5 seconds.
.catch((error) => { ... }): This callback is executed if there is an error sending the verification email.
console.error("Error sending verification email:", error): Logs the error message to the console.
alert("Error sending verification email: " + error.message): Displays an alert message with the error information.
```

###### Verify HTML Structure (verify.html)

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Verify Account</title>
    <script src="/dist/verify.bundle.js" defer></script>
  </head>
  <body>
    <h1>Verify Your Account</h1>
    <p>Please check your email for a verification link.</p>
  </body>
</html>
```

Explanation
verify.html: This HTML page serves as the landing page for users who click the verification link in their email.
script src="/dist/verify.bundle.js" defer: This script includes the verification logic and is loaded after the HTML content is parsed (due to defer).

#### Verification Logic in verify.js

```
import { Client, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6670bced001681b60586");

const account = new Account(client);

// Extract token and userId from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");
const secret = urlParams.get("secret");

// Verify the user
account
  .updateVerification(userId, secret)
  .then((response) => {
    console.log("User verified:", response);
    alert("Your account has been verified successfully!");
    window.location.href = "/src/pages/login.html"; // Redirect to login page
  })
  .catch((error) => {
    console.error("Error verifying account:", error);
    alert("Error verifying account: " + error.message);
  });
```

```
Explanation
Initialization: Similar to the signup.js, it initializes the Appwrite client and account instance.
URL Parameters: Extracts userId and secret from the URL's query parameters.
URLSearchParams(window.location.search): Parses the query parameters from the URL.
urlParams.get("userId"): Retrieves the userId parameter.
urlParams.get("secret"): Retrieves the secret parameter.
account.updateVerification(userId, secret): Calls the updateVerification method with the extracted userId and secret to verify the user's account.
.then((response) => { ... }): Executes if the verification is successful.
console.log("User verified:", response): Logs the success message.
alert("Your account has been verified successfully!"): Displays a success alert.
window.location.href = "/src/pages/login.html": Redirects the user to the login page.
.catch((error) => { ... }): Executes if there is an error during verification.
console.error("Error verifying account:", error): Logs the error message.
alert("Error verifying account: " + error.message): Displays an error alert.
```

Why Redirect to Login in Both signup.js and verify.js?
Redirect in signup.js:

After signing up, the user is informed that a verification email has been sent. Redirecting to the login page after this ensures the user knows where to go after verifying their email. It also cleans up the session in case the signup form might be used again without refreshing.
Redirect in verify.js:

After verifying their email, the user is redirected to the login page to log in for the first time. This is a logical next step, as they can now use their verified credentials to access their account.
This sequence ensures a smooth user experience:

User signs up and is informed to verify their email.
User verifies their email and is redirected to log in.
By separating these steps, you ensure users follow a clear path from account creation to account verification and finally to logging in.
