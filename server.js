import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected via WebSocket');
  
  ws.send(JSON.stringify({ type: 'connection', message: 'Connected to WebSocket server!', clientCount: wss.clients.size }));
  
  // Notify all clients about new connection
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === 1) {
      client.send(JSON.stringify({
        type: 'user-joined',
        message: 'A new user joined the chat',
        clientCount: wss.clients.size,
        timestamp: new Date().toISOString()
      }));
    }
  });
  
  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    console.log('Received WebSocket message:', data);
    
    if (data.type === 'ping') {
      // Instant ping-pong response (showcase low latency)
      const latency = Date.now() - data.timestamp;
      ws.send(JSON.stringify({
        type: 'pong',
        latency,
        timestamp: new Date().toISOString()
      }));
    } else if (data.type === 'typing') {
      // Broadcast typing indicator to other clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === 1) {
          client.send(JSON.stringify({
            type: 'typing',
            message: data.message,
            timestamp: new Date().toISOString()
          }));
        }
      });
    } else {
      // Broadcast message to ALL clients (including sender)
      const messageData = {
        type: 'message',
        message: data.message,
        timestamp: new Date().toISOString(),
        fromSelf: false
      };
      
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({
            ...messageData,
            fromSelf: client === ws
          }));
        }
      });
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
    // Notify remaining clients
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({
          type: 'user-left',
          message: 'A user left the chat',
          clientCount: wss.clients.size,
          timestamp: new Date().toISOString()
        }));
      }
    });
  });
});

// Simulated data sources for SSE
let stockPrice = 100;
let serverLoad = 50;
let activeUsers = 42;

// SSE endpoint
app.get('/api/events', (req, res) => {
  console.log('Client connected via SSE');
  
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });
  
  // Send initial connection message
  res.write(`data: ${JSON.stringify({ type: 'connection', message: 'Connected to SSE stream!' })}\n\n`);
  
  // Send periodic updates every 2 seconds - simulating real-time dashboard data
  const interval = setInterval(() => {
    // Simulate stock price fluctuation
    stockPrice += (Math.random() - 0.5) * 5;
    stockPrice = Math.max(50, Math.min(150, stockPrice));
    
    // Simulate server metrics
    serverLoad += (Math.random() - 0.5) * 10;
    serverLoad = Math.max(0, Math.min(100, serverLoad));
    
    // Simulate active users
    activeUsers += Math.floor((Math.random() - 0.5) * 3);
    activeUsers = Math.max(0, activeUsers);
    
    const data = {
      type: 'metrics',
      message: 'Dashboard metrics update',
      timestamp: new Date().toISOString(),
      metrics: {
        stockPrice: stockPrice.toFixed(2),
        serverLoad: serverLoad.toFixed(1),
        activeUsers: activeUsers,
        memoryUsage: (Math.random() * 100).toFixed(1)
      }
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 2000);
  
  // Send occasional alerts (every 8-12 seconds)
  let alertTimeout;
  const scheduleAlert = () => {
    const delay = 8000 + Math.random() * 4000;
    alertTimeout = setTimeout(() => {
      const alerts = [
        'New deployment completed successfully',
        'System backup finished',
        'Database optimization running',
        'Cache cleared automatically',
        'Security scan completed'
      ];
      res.write(`data: ${JSON.stringify({
        type: 'alert',
        message: alerts[Math.floor(Math.random() * alerts.length)],
        timestamp: new Date().toISOString(),
        severity: Math.random() > 0.7 ? 'warning' : 'info'
      })}\n\n`);
      scheduleAlert();
    }, delay);
  };
  scheduleAlert();
  
  req.on('close', () => {
    console.log('Client disconnected from SSE');
    clearInterval(interval);
    clearTimeout(alertTimeout);
  });
});

// Broadcast endpoint for WebSocket
app.post('/api/broadcast', (req, res) => {
  const { message } = req.body;
  
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // OPEN
      client.send(JSON.stringify({
        type: 'broadcast',
        message,
        timestamp: new Date().toISOString()
      }));
    }
  });
  
  res.json({ success: true, clientCount: wss.clients.size });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    websocketConnections: wss.clients.size 
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});
