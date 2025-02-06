const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Start HTTP Server
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Create WebSocket Server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message) => {
        // Ensure that the message is a string and not a Blob
        console.log(`Received: ${message}`);
        
        // Broadcast the message to all clients as a string
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message); // Send the text message
            }
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
