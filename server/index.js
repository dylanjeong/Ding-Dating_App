const express = require("express");
const PORT = 8080;
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const userRouter = require("./routes/users")
const conversationRouter = require("./routes/conversations")
const messageRouter = require("./routes/messages")
require("dotenv").config();

app.use(express.json());
app.use(cors())

mongoose.connect(process.env.DATABASE_URI)
  .then(()=> {
    console.log("connected")
  })

app.use("/users", userRouter)
app.use("/conversations", conversationRouter)
app.use("/messages", messageRouter)

app.listen(PORT, () => {
  console.log("server started " + PORT)
})