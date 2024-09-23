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
const PORT = process.env.PORT || 4002;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/learnup/api/payment-management", (req, res) => {
  res.send("payment managers service responded");
});

app.use("/learnup/api/payment-management", require("./routes/payment.routes"));

app.use(verifyJWT);
app.use(errorHandler);

// Use helmet to set security-related headers
app.use(helmet());

// Enable the X-Frame-Options header to prevent clickjacking
app.use(helmet.frameguard({ action: 'deny' }));

let serverPromise = new Promise((resolve, reject) => {
  mongoose.connection.once("open", () => {
    console.log(`🚀 data connection with payments collection established! 🚀`);
    const server = app.listen(PORT, () => {
      console.log(
        `💰 Payment management service is up and running on port: ${PORT} 💰`
      );
      resolve(server);
    });
  });
});

module.exports = { app, serverPromise };
