const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFile = path.join(__dirname, '../data/items.json');

function readItems() {
    if (!fs.existsSync(dataFile)) return [];
    const json = fs.readFileSync(dataFile);
    return JSON.parse(json);
}

function writeItems(items) {
    fs.writeFileSync(dataFile, JSON.stringify(items, null, 2));
}

// GET /api/items
router.get('/', (req, res) => {
    const items = readItems();
    res.json(items);
});

// POST /api/items
router.post('/', (req, res) => {
    const { title, type, genres, poster } = req.body;

    if (!title || !type) {
        return res.status(400).json({ error: 'Данные некорректны' });
    }

    const items = readItems();

    const newItem = {
        id: Date.now(),
        title,
        type,
        genres: Array.isArray(genres) ? genres : [],
        poster: poster || null
    };

    items.push(newItem);
    writeItems(items);

    res.status(201).json(newItem);
});

// DELETE /api/items/:id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let items = readItems();
    const newItems = items.filter(item => item.id !== id);

    if (items.length === newItems.length) {
        return res.status(404).json({ error: 'Item not found' });
    }

    writeItems(newItems);
    res.status(204).send();
});

module.exports = router;