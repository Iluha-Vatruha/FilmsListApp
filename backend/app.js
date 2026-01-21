const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const itemsRouter = require('./routes/items');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/items', itemsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;