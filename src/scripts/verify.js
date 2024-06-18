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
    window.location.href = "/pages/login.html"; // Redirect to login page
  })
  .catch((error) => {
    console.error("Error verifying account:", error);
    alert("Error verifying account: " + error.message);
  });
