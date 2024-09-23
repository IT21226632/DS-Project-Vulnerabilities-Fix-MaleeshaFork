require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
const connectDB = require("./config/connectDb");
const verifyJWT = require("./middlewares/verifyJWTMiddleware");
const helmet = require('helmet');

connectDB();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/learnup/api/user-management", (req, res) => {
  res.send("user managers service responded");
});

app.use(
  "/learnup/api/user-management/auth",
  require("./routes/auth-login.routes")
);

app.use(
  "/learnup/api/user-management/auth",
  require("./routes/auth-register.routes")
);
app.use(verifyJWT);
app.use(errorHandler);

// Use helmet to set security-related headers
app.use(helmet());

// Enable the X-Frame-Options header to prevent clickjacking
app.use(helmet.frameguard({ action: 'deny' }));

let serverPromise = new Promise((resolve, reject) => {
  mongoose.connection.once("open", () => {
    console.log(`🚀 data connection with users collection established! 🚀`);
    const server = app.listen(PORT, () => {
      console.log(
        `👦 User management service is up and running on port: ${PORT} 👦`
      );
      resolve(server);
    });
  });
});

module.exports = { app, serverPromise };
