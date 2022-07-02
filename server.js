const express = require("express");
const { db } = require("./config/db");
const app = express();

const { userRoutes } = require("./routes/userRoutes");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", userRoutes);

app.listen(3000, "localhost", async () => {
    await db();
    console.log("SERVER LISTEN ON PORT 3000");
});
