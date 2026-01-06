# WebSocket & Server-Sent Events Demo

A comprehensive demo showcasing real-time communication using **WebSockets** and **Server-Sent Events (SSE)** with a Node.js backend and React + TypeScript frontend styled with Tailwind CSS.

🌐 **[Documentation](https://programmer-timmy.github.io/websocket-sse-demo/)** - Main documentation page  
🚀 **[Live Demo](https://programmer-timmy.github.io/websocket-sse-demo/demo/)** - Try the interactive demo

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

Server will start on `http://localhost:3100` (without SSL)

#### Terminal 2 - Start the Frontend
```bash
npm run dev
```

Frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

Then open your browser and navigate to the URL shown in the terminal

### Option 2: Docker (Recommended for Production)

#### Without SSL (Development):
```bash
docker-compose up -d
```

#### With SSL (Production):
```bash
# First, generate or obtain SSL certificates (see SSL section below)
docker-compose -f docker-compose.ssl.yml up -d
```

Server will be available at `http://localhost:3100` or `https://localhost:3100` (with SSL)

### Option 3: GitHub Pages + Remote Server

1. The server is running at `ws.school.timmygamer.nl:3100` with SSL
2. Visit the deployed GitHub Pages at `https://your-username.github.io/websocket-sse-demo/`
3. The frontend will automatically connect to `wss://ws.school.timmygamer.nl:3100` (secure WebSocket)

## SSL/TLS Configuration

The server supports both HTTP and HTTPS (with WebSocket and WebSocket Secure).

### Quick Start - Generate Self-Signed Certificates (Development)

#### On Windows (PowerShell):
```powershell
.\generate-certs.ps1
```

#### On Linux/Mac:
```bash
chmod +x generate-certs.sh
./generate-certs.sh
```

Then start the server with SSL:
```bash
USE_SSL=true npm run server
```

### Production SSL Certificates

For production, use **Let's Encrypt** (free) or purchase certificates from a CA:

#### Let's Encrypt (Recommended):

**Quick Setup with Script:**
```bash
# Linux/Mac/WSL
chmod +x setup-letsencrypt.sh
sudo ./setup-letsencrypt.sh

# Windows PowerShell
.\setup-letsencrypt.ps1
```

**Manual Setup:**
```bash
# Install certbot
sudo apt-get install certbot

# Get certificate for your domain
sudo certbot certonly --standalone -d ws.school.timmygamer.nl --email your@email.com

# Copy certificates
sudo cp /etc/letsencrypt/live/ws.school.timmygamer.nl/fullchain.pem ./certs/cert.pem
sudo cp /etc/letsencrypt/live/ws.school.timmygamer.nl/privkey.pem ./certs/key.pem
sudo chown $USER:$USER ./certs/*.pem
```

See [SSL-SETUP.md](SSL-SETUP.md) for detailed instructions and auto-renewal setup.

#### Docker with SSL:
```bash
# Using docker-compose with SSL
docker-compose -f docker-compose.ssl.yml up -d

# Or manually
docker run -d \
  -p 3100:3100 \
  -e USE_SSL=true \
  -v $(pwd)/certs:/app/certs:ro \
  websocket-sse-server
```

### Environment Variables for SSL

- `USE_SSL=true` - Enable SSL/TLS support
- `SSL_CERT_PATH` - Path to certificate file (default: `certs/cert.pem`)
- `SSL_KEY_PATH` - Path to private key file (default: `certs/key.pem`)
- `PORT` - Server port (default: `3100`)

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
├── docker-compose.yml                 # Docker Compose configuration (HTTP)
├── docker-compose.ssl.yml             # Docker Compose with SSL support
├── generate-certs.sh                  # SSL certificate generator (Linux/Mac)
├── generate-certs.ps1                 # SSL certificate generator (Windows)
├── .github/workflows/deploy.yml       # GitHub Actions for auto-deployment
├── certs/                             # SSL certificates directory
│   └── README.md                      # SSL certificate documentation
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

### WebSocket (Secure)
- **Production:** `wss://ws.school.timmygamer.nl` - WebSocket Secure connection endpoint
- **Development:** `ws://localhost:3100` - WebSocket connection endpoint (local)

### HTTP/HTTPS & SSE
- `GET /api/events` - SSE endpoint for real-time server updates
- `POST /api/broadcast` - Broadcast message to all WebSocket clients
- `GET /api/health` - Server health check

**Production:** `https://ws.school.timmygamer.nl/api/*`  
**Development:** `http://localhost:3100/api/*`

The frontend automatically detects the environment and connects to the appropriate endpoint.

Production: `https://ws.school.timmygamer.nl:3100/api/*`  
Development: `http://localhost:3100/api/*`

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

