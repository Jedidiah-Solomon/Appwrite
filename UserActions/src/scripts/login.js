import { Client, Account, AppwriteException } from "appwrite";

console.log("Welcome to Login Page");

const client = new Client();

const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

client.setEndpoint(appwriteEndpoint).setProject(appwriteProjectId);

const account = new Account(client);

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;

  console.log("Attempting to log in with email:", email);
  console.log("Endpoint:", appwriteEndpoint);
  console.log("Project ID:", appwriteProjectId);

  try {
    const response = await account.createEmailPasswordSession(email, password);

    console.log("Login successful:", response);

    loginForm.reset();
    window.location.href = "/dashboard.html";
  } catch (error) {
    console.error("Login error:", error);
    handleError(error);
  }
});

function handleError(error) {
  if (error instanceof AppwriteException) {
    switch (error.code) {
      case 401:
        alert("Unauthorized: Please check your email and password.");
        break;
      case 403:
        alert("Forbidden: You do not have permission to access.");
        break;
      case 404:
        alert("Not Found: The requested resource could not be found.");
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
    console.error("Login Error:", error);
  }
}
