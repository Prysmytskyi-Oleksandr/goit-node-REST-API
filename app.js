const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
// const nodemailer = require("nodemailer");

const authRouter = require("./routes/api/auth-routes");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "o.prysmytskyi@meta.ua",
//     pass: process.env.META_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);
// const email = {
//   to: "fetiso8749@larland.com",
//   from: "o.prysmytskyi@meta.ua",
//   subject: "Test email",
//   html: `<p>Test email</p>`,
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

module.exports = app;
