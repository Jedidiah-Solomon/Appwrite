import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Use cors
app.use(express.json());

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
  const { to } = req.body;

  const mailOptions = {
    from: `"Bathphage ICT Center Itamaga" <${process.env.USER}>`,
    to,
    replyTo: process.env.REPLY_TO,
    subject: "Welcome to Bathphage ICT Center",
    text: "Happy new month to all our customers. God bless you",
    html: "<b>Happy new month to all our customers. God bless you</b>",
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
