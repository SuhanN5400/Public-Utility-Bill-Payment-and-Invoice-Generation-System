const express = require('express');
const paymentRoutes = require('./src/routes/paymentRoutes');
const path = require('path'); // Import path module to handle file paths

const app = express();
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the API routes
app.use('/api', paymentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
