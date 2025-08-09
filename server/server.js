require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const bookmarkRoutes = require('./routes/bookmarks');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(express.json());

const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({
  origin: FRONTEND,
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

// Connect Mongo
mongoose.connect(process.env.MONGO_URI, ).then(()=> console.log('Mongo connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', authMiddleware, bookmarkRoutes);

// Basic root
app.get('/', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
