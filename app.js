const express = require("express");
const app = express();
app.use(express.json());

const userRouter = require("./routes/userRoute");

app.use("/api/v1/user", userRouter);

module.exports = app;
