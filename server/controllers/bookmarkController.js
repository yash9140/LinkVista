const Bookmark = require('../models/Bookmark');
const { fetchJinaContent } = require('../utils/jina');
const { getFavicon } = require('../utils/favicon');

exports.createBookmark = async (req, res) => {
  try {
    const { url, tags } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    // Fetch content from Jina Reader
    const jina = await fetchJinaContent(url);
    const title = jina.title || url;
    const summary = jina.content || '';

    // Try to get a favicon
    let favicon = '';
    try { favicon = await getFavicon(url); } catch(e) { /* ignore */ }

    const bookmark = await Bookmark.create({
      user: req.userId,
      url,
      title,
      summary,
      favicon,
      tags: Array.isArray(tags) ? tags : []
    });

    res.status(201).json(bookmark);
  } catch (err) {
    console.error('createBookmark', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.listBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBookmark = async (req, res) => {
  try {
    const bm = await Bookmark.findOne({ _id: req.params.id, user: req.userId });
    if (!bm) return res.status(404).json({ error: 'Not found' });
    res.json(bm);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const result = await Bookmark.deleteOne({ _id: req.params.id, user: req.userId });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
