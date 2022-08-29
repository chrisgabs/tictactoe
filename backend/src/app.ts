import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.on("connection", (socket:any) => {
    console.log("connection");

    io.on("ping", (message:string) => {
        console.log(message);
    })
    
});

httpServer.listen(3001);