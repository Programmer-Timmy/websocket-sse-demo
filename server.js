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
  
  ws.send(JSON.stringify({ type: 'connection', message: 'Connected to WebSocket server!' }));
  
  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    console.log('Received WebSocket message:', data);
    
    // Echo back with timestamp
    ws.send(JSON.stringify({
      type: 'echo',
      message: data.message,
      timestamp: new Date().toISOString()
    }));
  });
  
  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
  });
});

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
  
  // Send periodic updates every 2 seconds
  const interval = setInterval(() => {
    const data = {
      type: 'update',
      message: 'Server time update',
      timestamp: new Date().toISOString(),
      random: Math.floor(Math.random() * 100)
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 2000);
  
  req.on('close', () => {
    console.log('Client disconnected from SSE');
    clearInterval(interval);
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
