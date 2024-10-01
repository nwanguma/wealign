// app/api/home/route.ts
import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
    // This allows the API route to handle WebSocket connections
    externalResolver: true,
  },
};

export default (req: any, res: any) => {
  if (req.method === "GET") {
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    res.end(); // Finalize the response
  } else {
    res.status(405).end(); // Method Not Allowed for other methods
  }
};
