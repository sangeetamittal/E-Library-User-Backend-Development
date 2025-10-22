const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

//Middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json())

//Loading routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const ebookRoutes = require('./routes/ebookRoutes')

//Mount routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/ebooks', ebookRoutes)

//Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.error('Database Connection Failed:', err));


app.get('/', (req, res) => {
  res.send('Server is running.');
});

//Starting Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

module.exports = app;