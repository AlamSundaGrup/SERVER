if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = require("./routers");
const app = express();

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

  socket.on("send-message", async ({ message, token }) => {
    await MessageController.createMessage(message, token);
    let messages = await MessageController.getMessages();

    io.emit("globalMessage", messages);
  });
});


// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

module.exports = app