# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy server file
COPY server.js ./

# Expose port 3100
EXPOSE 3100

# Set NODE_ENV to production
ENV NODE_ENV=production

# Run the server
CMD ["node", "server.js"]
