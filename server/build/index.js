"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = process.env.PORT || 3001;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
const server = app.listen(port, () => {
    console.log("listening at port " + port);
});
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(server);
io.on("connection", () => {
    console.log("Client connected");
});
