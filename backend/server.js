require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const itemsRouter = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/items', itemsRouter);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

const HOST = 'http://localhost';
app.listen(PORT, () => {
    console.log(`\nBackend FilmsListApp запущен`);
    console.log(`Открыть API: ${HOST}:${PORT}/api/items`);
    console.log(`Healthcheck: ${HOST}:${PORT}/api/health\n`);
});

module.exports = app;