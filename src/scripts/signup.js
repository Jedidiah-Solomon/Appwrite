import { Client, Account, ID } from "appwrite";

// Initialize the Appwrite client
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Set the endpoint of your Appwrite server
  .setProject("6670bced001681b60586"); // Set your project ID

// Create an Account instance
const account = new Account(client);

// Add an event listener to the signup form submission
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the user input values
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Create a new user account
    account
      .create(ID.unique(), email, password, username)
      .then((response) => {
        console.log("User created:", response);
        alert("User created successfully!");

        // Inform the user to check their email for verification
        alert("Please check your email for a verification link.");
        document.getElementById("signup-form").reset();

        setTimeout(() => {
          window.location.href = "/pages/login.html"; // Redirect to login page after 2 seconds
        }, 2000); // 2-second delay
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        alert("Error creating user: " + error.message);
      });
  });
