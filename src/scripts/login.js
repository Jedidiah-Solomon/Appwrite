import { Client, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6670bced001681b60586");

const account = new Account(client);

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    account
      .createSession(email, password)
      .then((response) => {
        console.log("User logged in:", response);
        alert("Login successful!");

        document.getElementById("login-form").reset();

        window.location.href = "/pages/news-today.html";
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        if (error.response) {
          console.log("Appwrite Error Response:", error.response);
          alert("Error logging in: " + error.response.message);
        } else {
          alert("Error logging in: " + error.message);
        }
      });
  });
