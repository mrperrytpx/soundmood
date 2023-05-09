require("dotenv").config();
const express = require("express");
const http = require("http");
const helmet = require("helmet");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));

let listeners = 0;

io.on("connection", (socket) => {
  let isStreaming = false;

  socket.on("start-streaming", () => {
    isStreaming = true;
    listeners++;
    io.emit("user-start", { listeners });
  });

  socket.on("get-streamers", () => {
    if (listeners <= 0) listeners = 0;
    socket.emit("current-streamers", { listeners });
  });

  socket.on("stop-streaming", () => {
    isStreaming = false;
    if (listeners >= 0) listeners--;
    io.emit("user-stop", { listeners });
  });

  socket.on("disconnect", () => {
    if (isStreaming && listeners > 0) listeners--;
    io.emit("user-stop", { listeners });
  });
});

server.listen(process.env.PORT || 5050, () =>
  console.log(`SERVER STARTED AT PORT ${process.env.PORT}`)
);
