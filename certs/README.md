# SSL Certificates Directory

This directory contains SSL/TLS certificates for HTTPS and WSS (WebSocket Secure) support.

## Development

For development, you can generate self-signed certificates:

### On Linux/Mac:
```bash
chmod +x ../generate-certs.sh
../generate-certs.sh
```

### On Windows (PowerShell):
```powershell
..\generate-certs.ps1
```

## Production

For production, use certificates from a trusted Certificate Authority:

### Option 1: Let's Encrypt (Recommended - Free)

Use Certbot to obtain free SSL certificates:

```bash
# Install certbot
sudo apt-get install certbot

# Get certificate
sudo certbot certonly --standalone -d play.timmygamer.nl

# Copy certificates to this directory
sudo cp /etc/letsencrypt/live/play.timmygamer.nl/fullchain.pem ./cert.pem
sudo cp /etc/letsencrypt/live/play.timmygamer.nl/privkey.pem ./key.pem
sudo chown $USER:$USER *.pem
```

### Option 2: Custom Certificate Authority

Place your certificates in this directory:
- `cert.pem` - Your SSL certificate (or fullchain)
- `key.pem` - Your private key

### Option 3: Using Docker Volumes

Mount your certificates when running the Docker container:

```bash
docker run -d \
  -p 3100:3100 \
  -e USE_SSL=true \
  -v /path/to/certs:/app/certs:ro \
  websocket-sse-server
```

Or with docker-compose:
```yaml
volumes:
  - /path/to/certs:/app/certs:ro
environment:
  - USE_SSL=true
```

## Environment Variables

- `USE_SSL=true` - Enable SSL/TLS support
- `SSL_CERT_PATH` - Custom path to certificate file (default: certs/cert.pem)
- `SSL_KEY_PATH` - Custom path to private key file (default: certs/key.pem)
- `PORT` - Server port (default: 3100)

## Security Notes

⚠️ **NEVER commit real SSL certificates to version control!**

The `.gitignore` file should exclude:
- `*.pem`
- `*.key`
- `*.crt`
- `*.pfx`

Self-signed certificates are **only for development**. Browsers will show security warnings for self-signed certificates.
