const io = require("socket.io")(8000, {
  cors:{
    origin: "http://localhost:3000",
  }
})

let users = []

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({userId, socketId})
}
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId)
}
const findUser = (userId) => {
  return users.find((user) => user.userId === userId)
}

io.on("connection", (socket) => {
  console.log("a user connected")
  io.emit("welcome")
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id)
    io.emit("getUsers", users)
  })

  socket.on("disconnect", () => {
    console.log("a user disconnected")
    removeUser(socket.id)
    io.emit("getUsers", users)
  })

  socket.on("sendMessage", ({senderId, receiverId, text}) => {
    const user = findUser(receiverId)
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text
    })
  })
})