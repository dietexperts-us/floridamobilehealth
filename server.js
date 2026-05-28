const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files with correct MIME types
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
    if (filePath.endsWith('.xml')) {
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('X-Robots-Tag', 'noindex');
    }
    if (filePath.endsWith('.txt')) {
      res.setHeader('Content-Type', 'text/plain');
    }
  }
}));

// Explicit sitemap route
app.get('/sitemap.xml', (req, res) => {
  res.setHeader('Content-Type', 'application/xml');
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

// Explicit robots.txt route
app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Florida Mobile Health running on port ${PORT}`);
});
