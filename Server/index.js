const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDB } = require("../config/database");
const authRoutes = require("./routes/auth");
const app = express();

connectToDB();

app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
