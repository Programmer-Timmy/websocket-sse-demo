# WebSocket & Server-Sent Events Demo

A comprehensive demo showcasing real-time communication using **WebSockets** and **Server-Sent Events (SSE)** with a Node.js backend and React + TypeScript frontend styled with Tailwind CSS.

## Features

### WebSocket
- ✅ Bi-directional real-time communication
- ✅ Send messages from client to server
- ✅ Receive instant responses
- ✅ Broadcast messages to all connected clients
- ✅ Connection status indicator

### Server-Sent Events (SSE)
- ✅ One-way server-to-client streaming
- ✅ Automatic periodic updates every 2 seconds
- ✅ Manual connect/disconnect controls
- ✅ Real-time timestamp and random data
- ✅ Connection status indicator

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

```bash
npm install
```

## Running the Demo

You need to run both the backend server and the frontend development server:

### Terminal 1 - Start the Backend Server
```bash
npm run server
```

Server will start on `http://localhost:3001`

### Terminal 2 - Start the Frontend
```bash
npm run dev
```

Frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

Then open your browser and navigate to the URL shown in the terminal

## How to Use

### WebSocket Demo
1. The WebSocket connection establishes automatically when you load the page
2. Type a message in the input field and click "Send" or press Enter
3. The server will echo your message back with a timestamp
4. Click "Send Broadcast to All Clients" to send a message to all connected clients (try opening multiple browser tabs!)

### SSE Demo
1. Click "Connect" to establish an SSE connection
2. The server will immediately send a connection message
3. Every 2 seconds, the server automatically pushes updates with timestamps and random values
4. Click "Disconnect" to stop receiving updates

## Project Structure

Clean and simple component structure:

```
websocket-sse-demo/
├── server.js                          # Node.js backend with WebSocket and SSE
├── src/
│   ├── components/
│   │   ├── WebSocketDemo.tsx         # WebSocket demo component
│   │   ├── SSEDemo.tsx               # Server-Sent Events demo component
│   │   └── InfoSection.tsx           # Information section
│   ├── hooks/
│   │   ├── useWebSocket.ts           # WebSocket connection logic
│   │   └── useServerSentEvents.ts    # SSE connection logic
│   ├── App.tsx                        # Main app component
│   ├── main.tsx                       # React entry point
│   └── index.css                      # Tailwind CSS imports
├── package.json
└── README.md
```

### Component Breakdown

**Components**:
- `WebSocketDemo.tsx` - Complete WebSocket interface with connection, messaging, and broadcast functionality
- `SSEDemo.tsx` - Complete Server-Sent Events interface with connect/disconnect controls
- `InfoSection.tsx` - Educational comparison section explaining both technologies

**Hooks**:
- `useWebSocket.ts` - Manages WebSocket connection, messages, and sending logic
- `useServerSentEvents.ts` - Manages SSE connection and event handling



## API Endpoints

### WebSocket
- `ws://localhost:3001` - WebSocket connection endpoint

### HTTP/SSE
- `GET /api/events` - SSE endpoint for real-time server updates
- `POST /api/broadcast` - Broadcast message to all WebSocket clients
- `GET /api/health` - Server health check

## Technologies Used

### Backend
- **Express.js** - Web framework
- **ws** - WebSocket library
- **cors** - CORS middleware

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling

## Key Differences: WebSocket vs SSE

| Feature | WebSocket | Server-Sent Events |
|---------|-----------|-------------------|
| Direction | Bi-directional (↔️) | One-way (server → client) |
| Protocol | WebSocket protocol | HTTP |
| Use Cases | Chat, gaming, collaboration | Live feeds, notifications, dashboards |
| Browser Support | Excellent | Excellent |
| Reconnection | Manual | Automatic |
| Complexity | Moderate | Simple |

## Learn More

- [WebSocket API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Server-Sent Events (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [ws library docs](https://github.com/websockets/ws)

## License

MIT

