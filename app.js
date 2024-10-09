require("dotenv").config();
const express = require("express");
const router = require("./routers");
const app = express();
const port = process.env.PORT;

const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const MessageController = require("./controllers/messageController");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("send-message", ({ message, token }) => {
    console.log(message, "ini di server");

    let response = MessageController.createMessage(message, token);

    io.emit("globalMessage", `Someone said: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    io.emit("userLeft", "A user has left the chat");
  });
});

httpServer.listen(3000);

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
