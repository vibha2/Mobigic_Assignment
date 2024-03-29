//import packages
const express = require("express");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const fileRoutes = require('./routes/FileUpload');
const Cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//import routes
const authRoutes = require("./routes/auth");

//PORT declaration
const PORT = process.env.PORT || 4000;

const app = express();

//database connect
database.connect();

app.use(fileUpload());
//middlewares
app.use(express.json());

app.use(Cors());


app.use('/api/v1/file', fileRoutes);
//routes
app.use("/api/v1/auth", authRoutes);

//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

//activate the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
