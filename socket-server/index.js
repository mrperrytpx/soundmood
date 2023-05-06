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

let visitors = 0;
let listeners = 0;

io.on("connection", (socket) => {
  visitors++;

  socket.broadcast.emit("user-connect", { visitors, listeners });

  let isStreaming = false;
  console.log("user connection");

  socket.on("start-streaming", () => {
    console.log("started streaming");
    isStreaming = true;
    listeners++;
    socket.broadcast.emit("start-streaming", { listeners });
  });

  socket.on("stop-streaming", () => {
    console.log("stopped streaming");
    isStreaming = false;
    listeners--;
    socket.broadcast.emit("start-streaming", { listeners });
  });

  // socket.on("visibility-change", () => {});

  socket.on("disconnect", () => {
    visitors--;
    if (isStreaming) listeners--;
    socket.broadcast.emit("user-disconnect", { visitors, listeners });
  });
});

server.listen(process.env.PORT || 5050, () =>
  console.log(`SERVER STARTED AT PORT ${process.env.PORT}`)
);

const MESSAGES = Object.freeze({
  INCREMENT: "increment",
  DECREMENT: "decrement",
});
