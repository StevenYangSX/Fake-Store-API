const express = require("express");
const connectDB = require("./config/db");
var path = require("path");
var cors = require('cors')
//initialize app
const app = express();
//connect to database
connectDB();

//init middleware
app.use(
  express.json({
    extended: false
  })
);
//add an endpoint
app.get("/api", (req, res) => {
  // res.send(res.json({
  //     msg: "Welcome to the fake store API"
  // }));
  res.sendFile(path.join(__dirname + "/index.html"));
});

//define all routes
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
  );
  next();
});
app.use(cors());
app.use("/api/users", require("./routes/users"));
app.use("/api/items", require("./routes/items"));
app.use("/api/auth", require("./routes/auth"));

//set port
const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT, console.log("Server Started"));