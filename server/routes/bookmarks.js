const express = require('express');
const router = express.Router();
const bc = require('../controllers/bookmarkController');

// Create bookmark (with auto-fetch title/summary/favicon)
router.post('/', bc.createBookmark);

// List user's bookmarks
router.get('/', bc.listBookmarks);

// Get single
router.get('/:id', bc.getBookmark);

// Delete
router.delete('/:id', bc.deleteBookmark);

module.exports = router;
