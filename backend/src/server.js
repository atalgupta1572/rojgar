import dns from 'node:dns';
// Use Google's DNS directly to bypass potentially problematic local/ISP resolvers
dns.setServers(['8.8.8.8', '8.8.4.4']); 
dns.setDefaultResultOrder('ipv4first');

import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';


const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // We'll restrict this in production
    methods: ['GET', 'POST']
  }
});

// Socket connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Client should emit this immediately after connecting with their JWT
  socket.on('join_user_room', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their personal room`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Make io globally available if needed
export { io };

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});