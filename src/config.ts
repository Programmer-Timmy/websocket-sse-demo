// API Configuration
// Automatically detects if running in development or production

const isDevelopment = import.meta.env.DEV;

// Server configuration
export const API_CONFIG = {
  // WebSocket URL
  WS_URL: isDevelopment 
    ? 'ws://localhost:3100' 
    : 'wss://ws.school.timmygamer.nl',
  
  // HTTP API base URL
  API_BASE_URL: isDevelopment 
    ? 'http://localhost:3100' 
    : 'https://ws.school.timmygamer.nl',
  
  // SSE endpoint
  SSE_URL: isDevelopment 
    ? 'http://localhost:3100/api/events' 
    : 'https://ws.school.timmygamer.nl/api/events',
};

// Broadcast endpoint
export const BROADCAST_URL = `${API_CONFIG.API_BASE_URL}/api/broadcast`;

// Health check endpoint
export const HEALTH_URL = `${API_CONFIG.API_BASE_URL}/api/health`;
