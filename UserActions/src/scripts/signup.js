import { Client, Account, ID, AppwriteException } from "appwrite";

console.log("Welcome to Signup Page!!!");

const client = new Client();

// Use the .env codes
const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

client.setEndpoint(appwriteEndpoint).setProject(appwriteProjectId);

const account = new Account(client);

const form = document.getElementById("signup-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await createUserWithRetry(email, password, name);
    console.log("User created successfully:", response);
    alert(`User created successfully and your ID is: ${response.$id}`);
    form.reset();

    // Send email asynchronously
    sendSignupEmail(email).catch((error) => {
      console.error("Error sending email:", error);
      alert("Error sending email:", error);
    });
    window.location.href = "/pages/login.html";
  } catch (error) {
    handleError(error);
  }
});

async function createUserWithRetry(
  email,
  password,
  name,
  retries = 3,
  delay = 2000
) {
  for (let i = 0; i < retries; i++) {
    try {
      return await account.create(ID.unique(), email, password, name);
    } catch (error) {
      if (error.code === 429 && i < retries - 1) {
        console.warn(
          `Rate limit exceeded, retrying in ${delay / 1000} seconds...`
        );
        alert(`Rate limit exceeded, retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

async function sendSignupEmail(email) {
  try {
    const response = await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: email }),
    });

    if (response.ok) {
      console.log("Email sent successfully");
      alert("Email sent successfully!! Please check your mail");
    } else {
      console.error("Error sending email");
      alert("Error sending email");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Error sending email:", error);
  }
}

function handleError(error) {
  switch (error.code) {
    case 400:
      handleBadRequestError(error);
      break;
    case 401:
      alert("Unauthorized: Please check your API credentials.");
      break;
    case 403:
      alert("Forbidden: You do not have permission to perform this action.");
      break;
    case 404:
      alert("Not Found: The requested resource could not be found.");
      break;
    case 409:
      alert("User already exists. Please try logging in.");
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
      console.error("Error creating user:", error);
      alert("An unknown error occurred. Please try again later.");
  }
}

function handleBadRequestError(error) {
  const errorMessage = error.message.toLowerCase();

  if (errorMessage.includes("email")) {
    alert("Invalid email format. Please enter a valid email address.");
  } else if (errorMessage.includes("password")) {
    alert(
      "Weak password. Please ensure your password meets the required criteria."
    );
  } else {
    alert("Bad Request: Please check your input and try again.");
  }

  console.error("Bad Request Error:", error);
  alert("Bad Request Error:", error);
}
