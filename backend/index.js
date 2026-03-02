const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const eventsRoutes = require('./routes/events');
const weatherRoutes = require('./routes/weather');
const missionsRoutes = require('./routes/missions');
const impactRoutes = require('./routes/impact');

app.use('/api/events', eventsRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/missions', missionsRoutes);
app.use('/api/impact', impactRoutes);

app.get('/', (req, res) => {
    res.send('SpaceScope API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
