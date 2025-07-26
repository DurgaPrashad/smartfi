import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Start the Go backend server
const goServerPort = 3001;
const goServer = spawn('./dist/server', [], {
  env: { ...process.env, PORT: goServerPort },
  stdio: 'inherit'
});

goServer.on('error', (error) => {
  console.error('Failed to start Go server:', error);
});

// Proxy API requests to Go server
app.use('/mcp', createProxyMiddleware({
  target: `http://localhost:${goServerPort}`,
  changeOrigin: true,
}));

app.use('/mockWebPage', createProxyMiddleware({
  target: `http://localhost:${goServerPort}`,
  changeOrigin: true,
}));

app.use('/login', createProxyMiddleware({
  target: `http://localhost:${goServerPort}`,
  changeOrigin: true,
}));

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// Serve the index.html for all other routes (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  goServer.kill();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  goServer.kill();
  process.exit(0);
});