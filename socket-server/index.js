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
  console.log("user connection");

  let isStreaming = false;

  socket.on("start-streaming", () => {
    console.log("start");
    isStreaming = true;
    listeners++;
    io.emit("user-start", { listeners });
  });

  socket.on("get-streamers", () => {
    socket.emit("current-streamers", { listeners });
  });

  socket.on("stop-streaming", () => {
    console.log("end");

    isStreaming = false;
    if (listeners >= 0) listeners--;
    io.emit("user-stop", { listeners });
  });

  socket.on("disconnect", () => {
    console.log("disconnect);");
    if (isStreaming && listeners >= 0) listeners--;
    io.emit("user-stop", { listeners });
  });
});

server.listen(process.env.PORT || 5050, () =>
  console.log(`SERVER STARTED AT PORT ${process.env.PORT}`)
);
