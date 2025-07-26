# Multi-stage build
FROM node:18-alpine AS frontend-builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY bun.lockb ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build:frontend

# Go backend build stage
FROM golang:1.21-alpine AS backend-builder

WORKDIR /app

# Copy Go module files
COPY server/go.mod server/go.sum ./server/
WORKDIR /app/server

# Download dependencies
RUN go mod download

# Copy Go source
COPY server/ .

# Build Go binary
RUN go build -o ../dist/server main.go

# Final stage
FROM node:18-alpine

WORKDIR /app

# Install dependencies for running the Node.js server
COPY package*.json ./
RUN npm install --only=production

# Copy built frontend
COPY --from=frontend-builder /app/dist ./dist

# Copy Go binary
COPY --from=backend-builder /app/dist/server ./dist/server

# Copy test data
COPY --from=backend-builder /app/server/test_data_dir ./server/test_data_dir

# Copy Node.js server
COPY server.js ./

# Make Go binary executable
RUN chmod +x ./dist/server

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]