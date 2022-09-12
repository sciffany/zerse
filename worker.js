import { createServer } from "http"
const { Server } require("socket.io");
import { createAdapter } from "@socket.io/cluster-adapter"
import { setupWorker } from "@socket.io/sticky"

const httpServer = createServer();
const io = new Server(httpServer);

io.adapter(createAdapter());

setupWorker(io);

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);
});
