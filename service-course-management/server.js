const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const express = require("express");
const errorHandler = require("./middleware/errorMiddleware");
require("dotenv").config();
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 2500;

dbConnect();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use helmet to set security-related headers
app.use(helmet());

// Enable the X-Frame-Options header to prevent clickjacking
app.use(helmet.frameguard({ action: 'deny' }));
app.use("/learnup/api/course-management", require("./routes/course.route"));
app.use("/learnup/api/course-management/contact-admin", require("./routes/contact.routes"));

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`🤖 Server is up and running on port ${PORT} 🤖`);
});
