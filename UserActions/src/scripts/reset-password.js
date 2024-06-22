import { Client, Account, AppwriteException } from "appwrite";

console.log("Welcome to Reset Password Page!!!");

const client = new Client();

const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

client.setEndpoint(appwriteEndpoint).setProject(appwriteProjectId);

const account = new Account(client);

const resetPasswordForm = document.getElementById("reset-password-form");

resetPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const currentEmail = resetPasswordForm["current-email"].value.trim();
  const currentPassword = resetPasswordForm["current-password"].value;
  const newPassword = resetPasswordForm["new-password"].value;
  const confirmNewPassword = resetPasswordForm["confirm-new-password"].value;

  // Validate if new password and confirm new password match
  if (newPassword !== confirmNewPassword) {
    alert("New password and confirm password must match.");
    return;
  }

  try {
    // Check if the user is already logged in
    let currentSession;
    try {
      currentSession = await account.get();
      console.log("Current session details:", currentSession);
    } catch (error) {
      if (error.code === 401) {
        // User is not logged in, prompt them to log in first
        alert("Please log in first to reset your password.");
        window.location.href = "/pages/login.html";
        return;
      } else {
        throw error;
      }
    }

    // Update the user's password
    await account.updatePassword(newPassword, currentPassword);

    // Notify user of success
    alert("Password updated successfully!");

    // Reset the form fields
    resetPasswordForm.reset();
  } catch (error) {
    console.error("Reset password error:", error);
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
        alert("User not found: The specified user does not exist.");
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
    console.error("Reset Password Error:", error);
  }
}
