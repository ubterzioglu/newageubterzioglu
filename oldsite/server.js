import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Lazy load API handlers
const handlers = {};

async function getHandler(name) {
  if (!handlers[name]) {
    const module = await import(`./api/${name}.js`);
    handlers[name] = module.default;
  }
  return handlers[name];
}

// API Routes wrapper
const createRoute = (handlerName) => async (req, res, next) => {
  try {
    const handler = await getHandler(handlerName);
    
    // Express req/res'i Vercel formatına benzer hale getir
    const vercelRes = {
      statusCode: 200,
      headers: {},
      setHeader: function(key, value) { this.headers[key] = value; },
      status: function(code) { 
        this.statusCode = code; 
        return this;
      },
      json: function(data) {
        res.status(this.statusCode);
        Object.entries(this.headers).forEach(([k, v]) => res.setHeader(k, v));
        res.json(data);
        return this;
      },
      end: function(data) {
        res.status(this.statusCode);
        Object.entries(this.headers).forEach(([k, v]) => res.setHeader(k, v));
        res.end(data);
        return this;
      }
    };
    
    await handler(req, vercelRes);
  } catch (err) {
    next(err);
  }
};

// Register API routes
app.all('/api/send', createRoute('send'));
app.all('/api/vote', createRoute('vote'));
app.all('/api/smell', createRoute('smell'));
app.all('/api/comment', createRoute('comment'));
app.all('/api/insights', createRoute('insights'));
app.all('/api/reset', createRoute('reset'));
app.all('/api/zbom-list', createRoute('zbom-list'));
app.all('/api/zbom-submit', createRoute('zbom-submit'));
app.all('/api/zbom-admin-list', createRoute('zbom-admin-list'));
app.all('/api/zbom-admin-action', createRoute('zbom-admin-action'));
app.all('/api/zbom-admin-update', createRoute('zbom-admin-update'));
app.all('/api/zbom-admin-curate', createRoute('zbom-admin-curate'));

// Static files
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: ['index.html']
}));

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
