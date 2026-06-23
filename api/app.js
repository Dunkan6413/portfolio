const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// import cors from "cors"

// API route imports
const authRoute = require("./routes/auth.route");

const app = express();
app.use(express.json());
// app.use(cors());

// API routes definition
app.use("/auth", authRoute);

const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DataBase");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
