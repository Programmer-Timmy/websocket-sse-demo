# WebSocket & Server-Sent Events Demo

A comprehensive demo showcasing real-time communication using **WebSockets** and **Server-Sent Events (SSE)** with a Node.js backend and React + TypeScript frontend styled with Tailwind CSS.

🌐 **[Live Demo on GitHub Pages](https://your-username.github.io/websocket-sse-demo/)** *(Note: You'll need to run the server locally or deploy it separately)*

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

You have multiple options to run the demo:

### Option 1: Local Development (Recommended for Development)

You need to run both the backend server and the frontend development server:

#### Terminal 1 - Start the Backend Server
```bash
npm run server
```

Server will start on `http://localhost:3100`

#### Terminal 2 - Start the Frontend
```bash
npm run dev
```

Frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

Then open your browser and navigate to the URL shown in the terminal

### Option 2: Docker (Recommended for Production)

Run the server using Docker:

```bash
# Build and run with docker-compose
docker-compose up -d

# Or build and run manually
docker build -t websocket-sse-server .
docker run -p 3100:3100 websocket-sse-server
```

Server will be available at `http://localhost:3100`

Then you can:
- Visit the [GitHub Pages demo](https://your-username.github.io/websocket-sse-demo/) and it will connect to play.timmygamer.nl:3100
- Or build the frontend and serve it: `npm run build && npm run preview`

### Option 3: GitHub Pages + Remote Server

1. The server is running at `play.timmygamer.nl:3100`
2. Visit the deployed GitHub Pages at `https://your-username.github.io/websocket-sse-demo/`
3. The frontend will automatically connect to `ws://play.timmygamer.nl:3100`

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
├── Dockerfile                         # Docker configuration for the server
├── docker-compose.yml                 # Docker Compose configuration
├── .github/workflows/deploy.yml       # GitHub Actions for auto-deployment
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
├── docs/                              # Built files for GitHub Pages
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
- `ws://play.timmygamer.nl:3100` - WebSocket connection endpoint (production)
- `ws://localhost:3100` - WebSocket connection endpoint (local development)

### HTTP/SSE
- `GET /api/events` - SSE endpoint for real-time server updates
- `POST /api/broadcast` - Broadcast message to all WebSocket clients
- `GET /api/health` - Server health check

## Technologies Used

### Backend
- **Express.js** - Web framework
- **ws** - WebSocket library
- **cors** - CORS middleware
- **Docker** - Containerization

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **GitHub Pages** - Hosting

## Deployment

### GitHub Pages (Frontend)

The frontend is automatically deployed to GitHub Pages when you push to the main branch. The workflow:

1. Builds the React app using Vite
2. Copies the build to the `docs/` folder
3. Deploys to GitHub Pages

To enable GitHub Pages:
1. Go to your repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to main branch to trigger deployment

### Docker (Backend)

Deploy the server anywhere Docker is supported:

```bash
# Using docker-compose
docker-compose up -d

# Or using Docker directly
docker build -t websocket-sse-server .
docker run -d -p 3001:3001 --name websocket-sse-server websocket-sse-server
```

For production deployment, consider:
- Using a reverse proxy (nginx) for SSL/TLS
- Setting up environment variables for configuration
- Using orchestration tools like Kubernetes or Docker Swarm

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

