import express from "express";
import cors from "cors";
import * as sdk from "node-appwrite"; // Use import syntax for node-appwrite
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config(); // Load environment variables from .env file into process.env

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for all other ports
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

// Endpoint to send email
app.post("/send-email", async (req, res) => {
  console.log("Received request to send email:", req.body); // Log the request body received
  const { to, text, html } = req.body;

  const mailOptions = {
    from: `"Bathphage ICT Center Itamaga" <${process.env.USER}>`,
    to,
    replyTo: process.env.REPLY_TO,
    subject: "Welcome to Bathphage ICT Center",
    text: text,
    html: html,
    cc: process.env.CC_MAIL,
    bcc: process.env.BCC_MAIL,
    attachments: [
      {
        filename: "new-calendar.pdf",
        path: path.join(__dirname, "src/img/new-calendar.pdf"),
        contentType: "application/pdf",
      },
      {
        filename: "ourlogo.png",
        path: path.join(__dirname, "src/img/ourlogo.png"),
        contentType: "image/png",
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully: ${info.messageId}`);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

const client = new sdk.Client()
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(process.env.VITE_APPWRITE_API_KEY);

const users = new sdk.Users(client);

// Handle POST request to delete a user
app.post("/delete-user", async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Use the users instance to delete the user
    const result = await users.delete(userId);
    res.json({ success: true, result });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(error.code || 500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
