import { Client, Account, AppwriteException } from "appwrite";

console.log("Welcome to Delete User Page!!!");

const client = new Client();

const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

client.setEndpoint(appwriteEndpoint).setProject(appwriteProjectId);

const account = new Account(client);

// Check if the user is logged in
async function checkLoggedIn() {
  try {
    // Fetch the current session details
    const session = await account.getSession("current");
    console.log("Current session details:", session);

    // Fetch user details
    const userDetails = await account.get();
    console.log("User details:", userDetails);

    // Retrieve and Set user ID in the form input field
    const userIdInput = document.getElementById("user-id");
    // userIdInput.value = userDetails.$id; //Take this out  of for production, so user will user his id sent during signup
  } catch (error) {
    console.error("Check logged in error:", error);
    if (error.code === 401) {
      // User is not logged in, redirect to login page
      alert("Please log in first to delete a user.");
      window.location.href = "/pages/login.html";
    } else {
      handleError(error);
    }
  }
}

// Call checkLoggedIn when the script loads to verify if the user is logged in
checkLoggedIn();

const deleteUserForm = document.getElementById("delete-user-form");

deleteUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userId = deleteUserForm["user-id"].value.trim();

  // Here you need to call a backend function or endpoint to delete the user
  // because the client-side SDK does not have the permission to delete users
  try {
    const response = await fetch("http://localhost:5000/delete-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("User deleted successfully:", result);
      alert("User deleted successfully!");
      deleteUserForm.reset();
    } else {
      const errorMessage = await response.text();
      console.error("Delete user error:", errorMessage);
      alert(`Delete user error: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Delete user error:", error);
    handleError(error);
  }
});

function handleError(error) {
  if (error instanceof AppwriteException) {
    switch (error.code) {
      case 401:
        alert("Unauthorized: Please check your API key.");
        break;
      case 403:
        alert("Forbidden: You do not have permission to delete users.");
        break;
      case 404:
        alert("User not found: The specified user ID does not exist.");
        break;
      case 429:
        alert("Too many requests. Please try again later.");
        break;
      case 500:
        alert("Internal Server Error: Please try again later.");
        break;
      case 503:
        alert(
          "Service Unavailable: The server is currently unable to handle the request."
        );
        break;
      default:
        alert(`Error: ${error.message}`);
    }
  } else {
    alert("An unexpected error occurred. Please try again later.");
    console.error("Delete User Error:", error);
  }
}
