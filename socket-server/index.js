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

io.on("connection", (socket) => {
  console.log("user connection");
});

server.listen(process.env.PORT || 5050, () =>
  console.log(`SERVER STARTED AT PORT ${process.env.PORT}`)
);

const MESSAGES = Object.freeze({
  INCREMENT: "increment",
  DECREMENT: "decrement",
});
