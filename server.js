const express = require("express");
const { Client, Account } = require("appwrite");

const app = express();
const port = 5500;

app.use(express.json()); // For parsing application/json

const client = new Client();

const apiKey =
  "0ff564dbb75d5d9d001ef8734694c811cbc252c35f5f84c91e933b12130994f22ed24838bd36ac5deee82cbe314870405d8ac140b5d891234659d1dc6fb65336b93d7f1d9763f1d08f7bad1ff4a8e2083e97a6155f2d178f34eb0c2040603b027824e397daef007868f5d21552c7491d4efcaad0c511ff42f29efcd191879d5d";
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6670bced001681b60586")
  .setKey(apiKey);

// Create an Account instance
const account = new Account(client);

// Endpoint to handle sending verification emails
app.post("/send-verification", (req, res) => {
  const { userId } = req.body;

  account
    .createVerification("http://localhost:5500/src/pages/verify.html")
    .then(() => {
      res.status(200).send("Verification email sent!");
    })
    .catch((error) => {
      res
        .status(500)
        .send("Error sending verification email: " + error.message);
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
